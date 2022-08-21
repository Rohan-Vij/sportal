"""Main entrypoint file for the Sportly API."""
from datetime import timedelta
import os

from flask import Flask, jsonify, request
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

app.config["SECRET_KEY"] = SECRET_KEY
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)

jwt = JWTManager(app)

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

## -- User Management -- ##


@app.route("/login", methods=["POST"])
def login():
    """
    Login a user.
    :return: A JWT access token if the user is found, an error otherwise.
    """
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = query_user(username)

    if not user:
        return jsonify({"message": "User not found"}), 404
    if password != user["password"]:
        return jsonify({"msg": "Incorrect or password"}), 401

    access_token = create_access_token(identity=str(user["_id"]))
    refresh_token = create_refresh_token(identity=str(user["_id"]))
    return jsonify(access_token=access_token, refresh_token=refresh_token), 200


@app.route("/signup", methods=["POST"])
def signup():
    """
    Signup a user.
    :return: A JWT access token if the user is created, an error otherwise.
    """
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = query_user(username)

    if user:
        return jsonify({"message": "User already exists"}), 400

    _id = users.insert_one(
        {"username": username, "password": password}).inserted_id

    access_token = create_access_token(identity=str(_id))
    refresh_token = create_refresh_token(identity=str(user["_id"]))

    return jsonify(access_token=access_token, refresh_token=refresh_token), 200


@app.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    """
    Refresh a JWT access token.
    :return: A JWT access token if the user is found and the token is valid, an error otherwise.
    """
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify(access_token=access_token)


# Helper functions


def query_user(username: str):
    """
    Query the database for a user with the given username.
    :param username: The username to search for.
    :return: The user if found, None otherwise.
    """
    user = users.find_one({"username": username})
    print(user)
    return None if not user else user


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=PORT, debug=True)
