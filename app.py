import os
import sys
import subprocess
import http.server
import socketserver

PORT = 7860

# Build dist if not built
if not os.path.exists("dist"):
    subprocess.run(["npm", "run", "build"])

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory="dist" if os.path.exists("dist") else ".", **kwargs)

if __name__ == "__main__":
    print(f"Starting NEXUS Server on port {PORT}")
    with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
        httpd.serve_forever()
