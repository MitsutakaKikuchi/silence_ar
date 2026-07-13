// ==========================================
// 静止検出（佇む者への一行）
// 端末を動かさず見つめ続けている——「沈黙している」——ことを検出する。
// ジャイロの変動幅が閾値以下のまま一定時間続いたら onStill を一度だけ発火。
// ジャイロが使えない環境（未許可・非対応・PC）では、値が一度も動かない
// ことを利用してフォールバック時間（少し長め）で発火する。
// ==========================================

const SAMPLE_INTERVAL_MS = 250;   // ジャイロ監視の間隔（rAFより粗く、負荷ほぼゼロ）
const MOVE_THRESHOLD = 0.02;      // 1サンプル間の変動がこれを超えたら「動いた」(正規化値)
const STILL_DURATION_MS = 4000;   // ジャイロ有効時: 静止と見なすまでの時間
const FALLBACK_DURATION_MS = 8000; // ジャイロ無効時: 無操作でのフォールバック時間

export class StillnessWatcher {
  /**
   * @param {() => ({x: number, y: number} | null)} getSample 現在の姿勢を返す関数（無効時は null）
   * @param {() => void} onStill 静止が続いたときに一度だけ呼ばれる
   */
  constructor(getSample, onStill) {
    this.getSample = getSample;
    this.onStill = onStill;
    this.timer = null;
    this.lastSample = null;
    this.stillMs = 0;
    this.gyroSeen = false; // ジャイロが一度でも実値を返したか
  }

  /** 監視を開始する（再スタートで積算はリセット） */
  start() {
    this.stop();
    this.lastSample = null;
    this.stillMs = 0;
    this.timer = setInterval(() => this.tick(), SAMPLE_INTERVAL_MS);
  }

  /** 監視を止める（発火せずに破棄） */
  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  /** タップ等の操作があったら積算をリセットする */
  notifyInteraction() {
    this.stillMs = 0;
  }

  tick() {
    const sample = this.getSample();

    if (sample && this.lastSample) {
      const delta = Math.abs(sample.x - this.lastSample.x)
                  + Math.abs(sample.y - this.lastSample.y);
      if (delta > 0) this.gyroSeen = true;
      if (this.gyroSeen && delta > MOVE_THRESHOLD) {
        this.stillMs = 0;
        this.lastSample = sample;
        return;
      }
    }
    this.lastSample = sample;

    this.stillMs += SAMPLE_INTERVAL_MS;
    const required = this.gyroSeen ? STILL_DURATION_MS : FALLBACK_DURATION_MS;
    if (this.stillMs >= required) {
      this.stop();
      this.onStill();
    }
  }
}
