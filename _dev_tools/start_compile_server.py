import http.server
import socketserver
import webbrowser
import os
import sys

# Change working directory to the folder containing this script
script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

PORT = 8000

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Disable caching to ensure checking latest files
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

print(f"Starting Local Server for MindAR Compilation...")
print(f"Target Directory: {script_dir}")

url = f"http://localhost:{PORT}/COMPILER_FIX.html"

print(f"Opening browser at: {url}")
try:
    webbrowser.open(url)
except Exception as e:
    print(f"Could not open browser automatically: {e}")

try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Server active at http://localhost:{PORT}")
        print("Press Ctrl+C to stop.")
        httpd.serve_forever()
except OSError as e:
    print(f"Error starting server (Port {PORT} might be busy): {e}")
except KeyboardInterrupt:
    print("\nServer stopped.")
