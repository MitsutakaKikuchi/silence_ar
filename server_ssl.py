import http.server
import ssl

server_address = ('0.0.0.0', 8000)
httpd = http.server.HTTPServer(server_address, http.server.SimpleHTTPRequestHandler)

# SSLコンテキストの作成
ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ctx.load_cert_chain(certfile='cert.pem', keyfile='key.pem')

# ソケットをSSLでラップ
httpd.socket = ctx.wrap_socket(httpd.socket, server_side=True)

print("Serving HTTPS on https://0.0.0.0:8000")
print("Access this from your iPhone at: https://172.23.0.213:8000")
print("NOTE: You will see a 'Not Secure' warning. Tap 'Show Details' -> 'Visit this website' to bypass it.")

httpd.serve_forever()
