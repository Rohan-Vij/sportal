"""Main entrypoint file for the Sportly API."""
from flask import Flask, jsonify
app = Flask(__name__)

PORT = 8000


@app.route('/')
def running_message():
    """Return a message that the server is running."""
    return jsonify({"message": f"Sportly API running at port {PORT}."})


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=PORT, debug=True)
