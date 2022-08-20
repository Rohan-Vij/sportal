"""Main entrypoint file for the Sportly API."""
import os

from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import (JWTManager, create_access_token,
                                create_refresh_token, get_jwt_identity,
                                jwt_required)

import pymongo
from bson.objectid import ObjectId
from dotenv import load_dotenv


# Loading env variables

load_dotenv()

DB_PASSWORD = os.getenv('DB_PASSWORD')
SECRET_KEY = os.getenv('SECRET_KEY')

# Creating the Flask app

app = Flask(__name__)
CORS(app)

PORT = 8000

# Initializing MongoDB

client = pymongo.MongoClient(
    f"mongodb+srv://rohan:{DB_PASSWORD}@cluster0.3ps82lq.mongodb.net/?retryWrites=true&w=majority")

db = client["sportal"]
users = db["users"]

# Routes


@app.route('/')
def running_message():
    """Return a message that the server is running."""
    return jsonify({"message": f"Sportly API running at port {PORT}."})


@app.route('/login')
def login():
    """Return a message that the server is running."""
    return jsonify({"message": "Login successful."})


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=PORT, debug=True)
