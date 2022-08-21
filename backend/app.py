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
posts = db["posts"]

# Routes


@app.route('/')
def running_message():
    """Return a message that the server is running."""
    return jsonify({"message": f"Sportly API running at port {PORT}."})

## -- User Management -- ##


@app.route("/auth/login", methods=["POST"])
def login():
    """
    Login a user.

    :return: A JWT access token if the user is found, an error otherwise.
    """
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = query_user(email)

    if not user:
        return jsonify({"message": "User not found"}), 404
    if password != user["password"]:
        return jsonify({"msg": "Incorrect password"}), 401

    access_token = create_access_token(identity=str(user["_id"]))
    refresh_token = create_refresh_token(identity=str(user["_id"]))
    return jsonify(access_token=access_token, refresh_token=refresh_token), 200


@app.route("/auth/signup", methods=["POST"])
def signup():
    """
    Signup a user.

    :return: A JWT access token if the user is created, an error otherwise.
    """
    name = request.json.get("name", None)
    password = request.json.get("password", None)
    email = request.json.get("email", None)
    phone = request.json.get("phone", None)
    gender = request.json.get("gender", None)
    dob = request.json.get("dob", None)

    user = query_user(email)

    if user:
        return jsonify({"message": "User with that email already exists"}), 400

    signup_document = {
        "name": name,
        "password": password,
        "email": email,
        "phone": phone,
        "gender": gender,
        "dob": dob
    }

    _id = users.insert_one(
        signup_document).inserted_id

    access_token = create_access_token(identity=str(_id))
    refresh_token = create_refresh_token(identity=str(user["_id"]))

    return jsonify(access_token=access_token, refresh_token=refresh_token), 200


@app.route("/auth/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    """
    Refresh a JWT access token.

    :return: A JWT access token if the token was refreshed.
    """
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify(access_token=access_token)

@app.route("/auth/update_password", methods=["POST"])
@jwt_required()
def update_password():
    """
    Update the password of the current user.

    :return: A success message if the password was successfully updated, an error otherwise.
    """
    password = request.json.get("password", None)

    if not password:
        return jsonify({"message": "Password not provided"}), 400

    identity = get_jwt_identity()
    users.update_one({"_id": ObjectId(identity)}, {"$set": {"password": password}})
    return jsonify({"message": "Password updated"}), 200

@app.route("/auth/update_info", methods=["POST"])
@jwt_required()
def update_info():
    """
    Update the user's information

    :return: A success message if the user's information was successfully
             updated, an error otherwise.
    """
    email = request.json.get("email", None)
    phone = request.json.get("phone", None)

    if not email and not phone:
        return jsonify({"message": "Name or phone number is required"}), 400

    identity = get_jwt_identity()
    if email:
        users.update_one({"_id": ObjectId(identity)}, {"$set": {"email": email}})
    elif phone:
        users.update_one({"_id": ObjectId(identity)}, {"$set": {"phone": phone}})
    
    return jsonify({"message": "Information updated"}), 200


## -- End User Management -- ##

## -- Post Management -- ##


@app.route("/posts/create", methods=["POST"])
@jwt_required()
def create_post():
    """
    Create a post.

    :return: A message indicating the post was created and its ID.
    """

    sport = request.json.get("sport", None)
    location = request.json.get("location", None)
    poster = request.json.get("poster", None)
    start_date = request.json.get("date", None)
    end_date = request.json.get("date", None)
    description = request.json.get("description", None)
    level = request.json.get("level", None)
    max_players = request.json.get("max_players", None)
    players = [poster]
    is_open = True

    post_document = {
        "sport": sport,
        "location": location,
        "poster": poster,
        "start_date": start_date,
        "end_date": end_date,
        "description": description,
        "level": level,
        "max_players": max_players,
        "players": players,
        "is_open": is_open
    }


    _id = posts.insert_one(
        post_document).inserted_id

    return jsonify({"message": "Success", "id": str(_id)}), 200

@app.route("/posts/<post_id>", methods=["GET"])
def get_post(post_id):
    """
    Get a post with the given ID.

    :param post_id: The ID of the post to get.
    :return: The post if found, an error otherwise.
    """

    post = posts.find_one({"_id": ObjectId(post_id)})
    if not post:
        return jsonify({"message": "Post not found"}), 404

    return jsonify(post), 200

@app.route("/posts/<post_id>/add/<email>", methods=["PATCH"])
@jwt_required()
def add_participant(post_id, email):
    """
    Add a user to the list of participants of a post.

    :param post_id: The ID of the post to update.
    :param email: The email of the user to add to the participants list.
    :return: A message indicating the post was updated.
    """

    post = posts.find({"_id": ObjectId(post_id)})
    if not post:
        return jsonify({"message": "Post not found"}), 404
    elif post["is_open"]:
        return jsonify({"message": "Post is already closed"}), 400

    posts.update_one({"_id": ObjectId(post_id)}, {'$push': {'players': email}})

    return jsonify({"message": "Success"}), 200

@app.route("/posts/<post_id>/remove/<email>", methods=["PATCH"])
@jwt_required()
def remove_participant(post_id, email):
    """
    Remove a user from the list of participants of a post.

    :param post_id: The ID of the post to update.
    :param email: The email of the user to remove from the participants list.
    :return: A message indicating the post was updated.
    """

    post = posts.find({"_id": ObjectId(post_id)})
    if not post:
        return jsonify({"message": "Post not found"}), 404
    elif users.find({"_id": ObjectId(get_jwt_identity())})["email"] != post["email"]:
        return jsonify({"message": "You are not the owner of this post"}), 400
    elif post["is_open"]:
        return jsonify({"message": "Post is already closed"}), 400

    posts.update_one({"_id": ObjectId(post_id)}, {'$pull': {'players': email}})

    return jsonify({"message": "Success"}), 200

@app.route("/posts/<post_id>/close", methods=["PATCH"])
@jwt_required()
def close_post(post_id):
    """
    Close a post.

    :param post_id: The ID of the post to update.
    :return: A message indicating the post was updated.
    """

    post = posts.find({"_id": ObjectId(post_id)})

    if not post:
        return jsonify({"message": "Post not found"}), 404

    if users.find({"_id": ObjectId(get_jwt_identity())})["email"] != post["email"]:
        return jsonify({"message": "You are not the owner of this post"}), 400

    posts.update_one({"_id": ObjectId(post_id)}, {'$set': {'is_open': False}})

    return jsonify({"message": "Success"}), 200

@app.route("/posts/all", methods=["GET"])
@jwt_required()
def get_all_posts():
    """
    Get all posts.

    :return: All posts.
    """

    all_posts = list(posts.find())
    return jsonify(all_posts), 200

@app.route("/posts/search", methods=["GET"])
@jwt_required()
def search_posts():
    """
    Search for posts.

    :param search: The search parameters.
    :return: All posts that match the search criteria.
    """
    search = request.args.get("search")

    all_posts = list(posts.find({"location": search}))

    return jsonify(all_posts), 200


## -- End Post Management -- ##


# Helper functions


def query_user(email: str, field="email"):
    """
    Query the database for a user with the given email.

    :param user: The email to search for.
    :param field: The field to search in (default "email").
    :return: The user if found, None otherwise.
    """
    user = users.find_one({field: email})
    print(user)
    return None if not user else user


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=PORT, debug=True)
