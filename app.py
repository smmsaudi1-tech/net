import os
import http.server
import socketserver

PORT = 7860

# Serve from dist directory or current directory
DIRECTORY = "dist" if os.path.exists("dist") else "."

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

if __name__ == "__main__":
    print(f"Serving NEXUS from '{DIRECTORY}' on port {PORT}")
    with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
        httpd.serve_forever()
