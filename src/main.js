// ==========================================
// 沈黙の解剖図譜 — エントリーポイント
// boot: スタイル → コンポーネント登録 → シーン注入 → メイン初期化
// ==========================================

// スタイル（関心別に分割）
import './styles/fonts.css';
import './styles/base.css';
import './styles/fx.css';
import './styles/indicator.css';
import './styles/buttons.css';
import './styles/scan.css';
import './styles/loading.css';
import './styles/completion.css';
import './styles/profile.css';
import './styles/intro.css';
import './styles/card.css';

// AR（MindAR Three.js版）
import { ARScene, fetchTargets } from './ar/arScene.js';

// コア・UI・演出
import { state } from './core/state.js';
import { events } from './core/events.js';
import { LoadingManager } from './core/loadingManager.js';
import { GyroParallax } from './core/gyro.js';
import { preloadedImageCache, startStaggeredPreload } from './core/preload.js';
import { episodes, setEpisodeText } from './data/episodes.js';
import { TimeBasedEnvironment } from './fx/timeEnvironment.js';
import { ParticleSystem } from './fx/petals.js';
import { RippleEffect } from './ui/ripple.js';
import { TheaterMode } from './ui/theaterMode.js';
import { openCard, closeCard, pingSeed } from './ui/cardMotion.js';
import { swapOverlay } from './ui/transitions.js';
import { revealIntroTitle, playIncision } from './ui/introFx.js';
import { playConstellation } from './ui/completionFx.js';
import { AmbientSound } from './audio/ambientSound.js';

// ARシーン（カメラ起動はユーザージェスチャーまで遅延）
const arScene = new ARScene(document.querySelector('#ar-container'));

// ?debug でFPSメーターを表示（実機での性能確認用）
if (new URLSearchParams(window.location.search).has('debug')) {
    import('stats.js').then(({ default: Stats }) => {
        const stats = new Stats();
        stats.showPanel(0);
        stats.dom.style.zIndex = '9999999';
        document.body.appendChild(stats.dom);
        const loop = () => {
            stats.update();
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    });
}

// 時間帯による環境変化
let timeEnvironment = null;

// グローバルローディングマネージャー
let loadingManager = null;

// ==========================================
// メイン初期化
// ==========================================
function mainInit() {
    timeEnvironment = new TimeBasedEnvironment();

    const card = document.querySelector('.card');
    const scanningGuide = document.getElementById('scanning-guide-container');
    const customLoading = document.getElementById('custom-loading');
    const uiTitle = document.querySelector('#ui-title');
    const uiImage = document.querySelector('#ui-image');
    const uiDesc = document.querySelector('#ui-desc');
    const closeBtn = document.querySelector('.close-btn');
    const imageLoading = document.getElementById('image-loading');
    const arContainer = document.querySelector('#ar-container');
    const introOverlay = document.getElementById('intro-overlay');
    const introStartBtn = document.getElementById('intro-start-btn');
    const completionOverlay = document.getElementById('completion-overlay');
    const completionRestartBtn = document.getElementById('completion-restart-btn');
    const completionProfileBtn = document.getElementById('completion-profile-btn');
    const profileOverlay = document.getElementById('profile-overlay');
    const profileCloseBtn = document.getElementById('profile-close-btn');
    
    let currentTargetIndex = -1;
    let sceneLoaded = false;
    let arReady = false;
    let introShown = false;
    let completionShown = false;
    
    // 閲覧履歴をlocalStorageから復元
    const viewedEpisodes = new Set();
    try {
        const saved = localStorage.getItem('silence_ar_viewed_episodes');
        if (saved) {
            JSON.parse(saved).forEach(idx => viewedEpisodes.add(idx));
        }
    } catch (e) {
        console.warn('Failed to load viewed episodes:', e);
    }
    
    const hasVisited = sessionStorage.getItem('silence_ar_visited') === 'true';
    
    // イントロ開始ボタン
    if (introStartBtn) {
        introStartBtn.addEventListener('click', () => {
            if (introShown) return;
            introShown = true;
            sessionStorage.setItem('silence_ar_visited', 'true');

            // ユーザージェスチャー起点でカメラを起動（iOSの権限連鎖）
            startARSafely();

            // 切開ワイプ（最初の一刀）でカメラビューへ入り、ガイドを表示
            playIncision(introOverlay, () => {
                introOverlay.classList.remove('visible');
                introOverlay.classList.add('hidden');
                scanningGuide.classList.add('visible');
            });
        });
    }
    
    // 完了画面: リスタートボタン
    if (completionRestartBtn) {
        completionRestartBtn.addEventListener('click', () => {
            completionOverlay.classList.remove('visible');
            completionShown = true; /* 永続的に非表示化するためtrueを維持 */
            
            // スキャンガイドを再表示
            if (sceneLoaded) {
                scanningGuide.classList.remove('hidden');
                scanningGuide.classList.add('visible');
            }
            
            updateEpisodeIndicator(-1); 
            
            // シードのカレント表示のみリセット
            document.querySelectorAll('.episode-seed').forEach(seed => {
                seed.classList.remove('current');
            });
    
            // 完了演出後はボタンの配置は変更しない（既に正しい位置にある）
        });
    }
    
    // 永続的なプロフィールボタン
    // （表示切替は View Transitions 対応環境ではページ全体のクロスフェードになる）
    const persistentProfileBtn = document.getElementById('persistent-profile-btn');
    if (persistentProfileBtn) {
        persistentProfileBtn.addEventListener('click', () => {
            if (profileOverlay) swapOverlay(() => profileOverlay.classList.add('visible'));
        });
    }

    // 完了画面: プロフィールボタン
    if (completionProfileBtn) {
        completionProfileBtn.addEventListener('click', () => {
            swapOverlay(() => profileOverlay.classList.add('visible'));
        });
    }

    // プロフィール: 閉じるボタン
    if (profileCloseBtn) {
        profileCloseBtn.addEventListener('click', () => {
            swapOverlay(() => profileOverlay.classList.remove('visible'));
        });
    }

    // プロフィール・オーバーレイクリックで閉じる（外側）
    if (profileOverlay) {
        profileOverlay.addEventListener('click', (e) => {
            if (e.target === profileOverlay) {
                swapOverlay(() => profileOverlay.classList.remove('visible'));
            }
        });
    }
    
    // 全エピソード閲覧時のエンディング表示
    // ①シードの星座演出 → ②エピローグの詩が一行ずつ立ち上がる
    function showCompletion() {
        if (completionShown) return;
        completionShown = true;

        completionOverlay.classList.add('visible');

        playConstellation(particleSystem, () => {
            const lines = completionOverlay.querySelectorAll('.line');
            lines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.opacity = '1';
                    line.style.transform = 'translateY(0)';
                    line.style.transition = 'all 1s ease';
                }, 300 + index * 800);
            });
        });
    }
    
    // ローディングマネージャー初期化
    loadingManager = new LoadingManager();
    loadingManager.setStageActive('library');
    
    // ライブラリはバンドル済み（このコードが動いている時点で読み込み完了）
    loadingManager.setStageComplete('library');

    // Webフォント（しっぽり明朝）の先読みもローディングの儀式に組み込む
    loadingManager.setStageActive('fonts');
    Promise.all([
        document.fonts.load('400 1em "Shippori Mincho B1"'),
        document.fonts.load('500 1em "Shippori Mincho B1"')
    ]).catch(() => {}).finally(() => {
        loadingManager.setStageComplete('fonts');
        // 図譜の取得が先に終わっていた場合はステージ表示を巻き戻さない
        if (!loadingManager.stages.targets.complete) {
            loadingManager.setStageActive('targets');
        }
    });
    
    // インスタレーション機能の初期化
    const particleCanvas = document.getElementById('particle-canvas');
    const particleSystem = new ParticleSystem(particleCanvas);
    particleSystem.animate();
    
    const rippleContainer = document.getElementById('ripple-container');
    const rippleEffect = new RippleEffect(rippleContainer);
    
    const theaterPoem = document.getElementById('theater-poem');
    const theaterMode = new TheaterMode(theaterPoem);
    
    const ambientSound = new AmbientSound();
    
    // ジャイロスコープ
    const mistLayer = document.querySelector('.mist-layer');
    state.gyroData = { gamma: 0, beta: 0 }; // グローバルジャイロデータ
    state.arTargetActive = false; // ターゲット認識状態
    
    const gyroParallax = new GyroParallax((x, y) => {
        state.gyroData.gamma = x;
        state.gyroData.beta = y;
        if (mistLayer) mistLayer.style.transform = `translate(${x * 20}px, ${y * 10}px)`;
        particleSystem.updateGyro(x, y);
    });
    
    document.addEventListener('touchstart', (e) => {
        gyroParallax.requestPermission();
        if (!theaterMode.enabled || card.classList.contains('visible')) return;
        const touch = e.touches[0];
        rippleEffect.create(touch.clientX, touch.clientY);
    });
    
    // iPad（デスクトップモード時のSafari）などタップがclickとして判定される環境向け
    document.addEventListener('click', (e) => {
        gyroParallax.requestPermission();
        if (!theaterMode.enabled || card.classList.contains('visible')) return;
        // clickイベントの場合はclientX/Yを直接使用
        rippleEffect.create(e.clientX, e.clientY);
    });
    
    document.addEventListener('click', (e) => {
        if (!theaterMode.enabled || card.classList.contains('visible')) return;
        rippleEffect.create(e.clientX, e.clientY);
    });
    
    // 没入モードボタン（統合）
    const theaterBtn = document.getElementById('theater-mode-btn');
    if (theaterBtn) {
        theaterBtn.addEventListener('click', () => {
            const theaterEnabled = theaterMode.toggle();
            ambientSound.toggle();
            theaterBtn.classList.toggle('active', theaterEnabled);
        });
    }
    
    // エピソードインジケーター更新
    function updateEpisodeIndicator(index, justViewed = false) {
        const seeds = document.querySelectorAll('.episode-seed');
        seeds.forEach((seed, i) => {
            seed.classList.remove('current');
            if (viewedEpisodes.has(i)) {
                seed.classList.add('viewed');
            }
        });
        
        if (index >= 0 && index < seeds.length) {
            seeds[index].classList.add('current');
            if (justViewed) {
                viewedEpisodes.add(index);
                seeds[index].classList.add('viewed');
                pingSeed(seeds[index]); // 発芽ポップ

                // localStorageに保存
                try {
                    localStorage.setItem('silence_ar_viewed_episodes',
                        JSON.stringify([...viewedEpisodes]));
                } catch (e) {
                    console.warn('Failed to save viewed episodes:', e);
                }
            }
        }
    }
    
    // エピソードシードクリックイベント
    document.querySelectorAll('.episode-seed').forEach((seed, index) => {
        seed.addEventListener('click', () => {
            if (!viewedEpisodes.has(index)) return;
            const data = episodes[index];
            if (!data) return;
            
            const wasViewed = viewedEpisodes.has(index);
            const cardWasVisible = card.classList.contains('visible');
            
            state.arTargetActive = false;
            currentTargetIndex = index;
            
            const previewPrompt = document.getElementById('ar-preview-prompt');
            if (previewPrompt) previewPrompt.classList.remove('visible');
            
            scanningGuide.classList.remove('visible');
            scanningGuide.classList.add('hidden');
            
            const cardContent = document.querySelector('.card-content');
            if (cardContent) cardContent.scrollTop = 0;
            
            setEpisodeText(uiTitle, uiDesc, data);
    
            const isPreloaded = preloadedImageCache[index];
            if (!isPreloaded) imageLoading.classList.remove('hidden');
            uiImage.classList.remove('loaded');
            
            uiImage.onload = () => {
                imageLoading.classList.add('hidden');
                setTimeout(() => {
                    uiImage.classList.add('loaded');
                }, isPreloaded ? 50 : 150);
            };
            
            uiImage.src = data.image;
            
            if (!cardWasVisible) {
                setTimeout(() => openCard(card), 80);
            } else {
                openCard(card);
            }

            if (!wasViewed) {
                viewedEpisodes.add(index);
                updateEpisodeIndicator(index, true);
                if (viewedEpisodes.size === 10 && !completionShown) {
                    setTimeout(() => showCompletion(), 6000);
                }
            } else {
                updateEpisodeIndicator(index, false);
            }
            
            if (theaterBtn) theaterBtn.style.display = 'none';
            if (persistentProfileBtn) persistentProfileBtn.classList.add('hidden-manual');
        });
    });
    
    // 画像プリロード完了チェック
    function checkImagesLoaded() {
        const loaded = Object.keys(preloadedImageCache).length;
        loadingManager.updateImageProgress(loaded);
        
        if (loaded >= 10) {
            loadingManager.setStageComplete('images');
            return true;
        }
        return false;
    }
    
    // ロード完了判定（図譜と画像の両方が揃ったか。カメラはイントロのタップで起動する）
    function checkAndFinishLoading() {
        const imagesDone = loadingManager.stages.images.complete;
        const targetsDone = loadingManager.stages.targets.complete;

        console.log(`Check finish: Images=${imagesDone}, Targets=${targetsDone}`);

        if (imagesDone && targetsDone) {
            onAllReady();
        }
    }
    
    // 全ての準備完了時の処理
    function onAllReady() {
        if (arReady) return;
        arReady = true;
        
        // 閲覧履歴を初期表示に反映
        updateEpisodeIndicator(-1);
        
        // 少し待ってからフェードアウト
        setTimeout(() => {
            customLoading.classList.add('fade-out');
            
            setTimeout(() => {
                // 初回かつ未訪問ならイントロを表示（カメラはタップ時に起動）、
                // 再訪時は即カメラ起動してガイドへ
                if (!hasVisited && !introShown) {
                    introOverlay.classList.remove('hidden');
                    introOverlay.classList.add('visible');
                    revealIntroTitle(introOverlay);
                } else {
                    startARSafely();
                    scanningGuide.classList.remove('hidden');
                    scanningGuide.classList.add('visible');
                }
            }, 800);
        }, 500);
    }
    
    // カメラ起動 + 描画ループ開始。
    // 初回訪問はイントロのタップから、再訪時は onAllReady から呼ばれる。
    async function startARSafely() {
        try {
            await arScene.start();
        } catch (err) {
            console.error('カメラ起動に失敗:', err);
            const guideText = document.querySelector('.scanning-guide-text');
            if (guideText) {
                guideText.textContent = 'カメラを利用できません。ブラウザの設定でカメラを許可し、再読み込みしてください。';
            }
        }
    }

    // targets.mind をストリーム取得 → MindARThree 構築 → 画像プリロード
    async function initAR() {
        try {
            const targetsUrl = await fetchTargets('./targets.mind', (ratio) => {
                loadingManager.setStagePartial('targets', ratio);
            });
            arScene.init(targetsUrl);
            sceneLoaded = true;

            loadingManager.setStageComplete('targets');
            loadingManager.setStageActive('images');

            // 段階的プリロード開始（帯域を圧迫しない）
            startStaggeredPreload(loadingManager);

            // 画像プリロード状況を定期的にチェック
            const imageCheckInterval = setInterval(() => {
                if (checkImagesLoaded()) {
                    clearInterval(imageCheckInterval);
                    checkAndFinishLoading();
                }
            }, 200);

            // タイムアウト（5秒）で画像ロードを強制完了
            setTimeout(() => {
                clearInterval(imageCheckInterval);
                loadingManager.setStageComplete('images');
                checkAndFinishLoading();
            }, 5000);
        } catch (err) {
            console.error('AR初期化に失敗:', err);
            const mainText = document.getElementById('loading-main-text');
            if (mainText) {
                mainText.textContent = '読み込みに失敗しました。通信環境を確認し、再読み込みしてください。';
            }
        }
    }
    initAR();

    // フォールバック：一定時間後に強制的に準備完了
    setTimeout(() => {
        if (!arReady) {
            console.log('Forcing AR ready state');
            onAllReady();
        }
    }, 12000);
    
    // 閉じるボタン
    closeBtn.addEventListener('click', () => {
        closeCard(card);

        // ターゲット認識状態をリセット
        state.arTargetActive = false;
        currentTargetIndex = -1;
        
        // プレビュープロンプトも非表示
        const previewPrompt = document.getElementById('ar-preview-prompt');
        if (previewPrompt) {
            previewPrompt.classList.remove('visible');
        }
        
        if (sceneLoaded) {
            scanningGuide.classList.remove('hidden');
            scanningGuide.classList.add('visible');
        }
        updateEpisodeIndicator(-1);
        
        // ボタンを再表示
        if (theaterBtn) theaterBtn.style.display = '';
        if (persistentProfileBtn) persistentProfileBtn.classList.remove('hidden-manual');
    });
    
    const onTargetFound = (index) => {
        if (state.arTargetActive && currentTargetIndex === index) return;
        if (card.classList.contains('visible') ||
            completionOverlay.classList.contains('visible') || 
            profileOverlay.classList.contains('visible')) return;
    
        console.log('Target Found:', index);
        currentTargetIndex = index;
        state.arTargetActive = true;
        
        // テクスチャの遅延ロード（初回検出時のみ実行される）
        arScene.loadTextures(index);
        
        scanningGuide.classList.remove('visible');
        scanningGuide.classList.add('hidden');
    
        const data = episodes[index];
        if (!data) return;
        
        const cardContent = document.querySelector('.card-content');
        if (cardContent) cardContent.scrollTop = 0;
        
        setEpisodeText(uiTitle, uiDesc, data);
    
        const isPreloaded = preloadedImageCache[index];
        if (!isPreloaded) imageLoading.classList.remove('hidden');
        uiImage.classList.remove('loaded');
        
        uiImage.onload = () => {
            imageLoading.classList.add('hidden');
            setTimeout(() => {
                uiImage.classList.add('loaded');
            }, isPreloaded ? 50 : 150);
        };
        
        uiImage.onerror = () => {
            imageLoading.classList.add('hidden');
            console.error('Failed to load image:', data.image);
        };
        
        uiImage.src = data.image;
        
        const previewPrompt = document.getElementById('ar-preview-prompt');
        if (previewPrompt) {
            previewPrompt.querySelector('.preview-title').textContent = data.title;
            previewPrompt.classList.add('visible');
        }
        
        updateEpisodeIndicator(index, false);
        if (theaterBtn) theaterBtn.style.display = 'none';
        if (persistentProfileBtn) persistentProfileBtn.classList.add('hidden-manual');
    };
    
    // プレビュープロンプトをタップでカードUI表示
    const showCardUI = () => {
        if (currentTargetIndex < 0) return;
        
        const previewPrompt = document.getElementById('ar-preview-prompt');
        if (previewPrompt) previewPrompt.classList.remove('visible');

        setTimeout(() => {
            openCard(card);
            updateEpisodeIndicator(currentTargetIndex, true);
            if (viewedEpisodes.size === 10 && !completionShown) {
                setTimeout(() => showCompletion(), 6000);
            }
        }, 80);
    };
    
    // プレビュープロンプトのクリックイベント
    const previewPrompt = document.getElementById('ar-preview-prompt');
    if (previewPrompt) previewPrompt.addEventListener('click', showCardUI);
    
    // カメラビュー全体のタップでもカードUI表示（プレビュー状態の時のみ）。
    // 同じタップが「傷に触れる」動作にもなる（シェーダーのタッチリップル）。
    arContainer.addEventListener('click', (e) => {
        const promptVisible = previewPrompt && previewPrompt.classList.contains('visible');
        if (promptVisible && !card.classList.contains('visible')) {
            if (currentTargetIndex >= 0) {
                arScene.touchAt(e.clientX, e.clientY, currentTargetIndex);
            }
            showCardUI();
        }
    });
    
    const onTargetLost = (index) => {
        console.log('Target Lost:', index);
        // ターゲットが見えなくなったら認識状態をリセット
        if (currentTargetIndex === index) {
            state.arTargetActive = false;
            
            // プレビュープロンプトを非表示
            const previewPrompt = document.getElementById('ar-preview-prompt');
            if (previewPrompt) {
                previewPrompt.classList.remove('visible');
            }
            
            // スキャンガイドを再表示（カードが表示されていない場合のみ）
            const card = document.querySelector('.card');
            if (card && !card.classList.contains('visible')) {
                scanningGuide.classList.remove('hidden');
                scanningGuide.classList.add('visible');
                
                // 「没入」「製作者」ボタンも再表示
                if (theaterBtn) theaterBtn.style.display = '';
                if (persistentProfileBtn) persistentProfileBtn.classList.remove('hidden-manual');
            }
        }
    };
    
    events.on('targetFound', onTargetFound);
    events.on('targetLost', onTargetLost);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mainInit);
} else {
    mainInit();
}
