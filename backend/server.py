from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS ,cross_origin


app = Flask(__name__)
CORS(app)

@app.route("/")
def helloWorld():
  return "Hello, cross-origin-world!"

# Initialize the MongoDB client and database
client = MongoClient('mongodb://localhost:27017')
db = client['managertask']

# Route for creating a new user
@app.route('/users', methods=['POST'])
def create_user():
    body = request.json
    firstName = body['firstName']
    lastName = body['lastName']
    emailId = body['emailId']
    db['users'].insert_one({
        "firstName": firstName,
        "lastName": lastName,
        "emailId": emailId
    })
    return jsonify({'status': 'data is posted to MongoDB',
                'firstName': firstName,
                'lastName': lastName,
                'emailId': emailId})

# Route for getting all users
@app.route('/users', methods=['GET'])
def get_all_users():
    users_list = []
    for user in db['users'].find():
        user['_id'] = str(user['_id'])  # convert ObjectId to string
        users_list.append(user)
    return jsonify(users_list)

# Route for getting a single
@app.route('/users/<string:id>', methods=['GET'])
def get_user(id):
    data = db['users'].find_one({"_id": ObjectId(id)})
    if data:
        _id = str(data['_id'])
        firstName = data['firstName']
        lastName = data['lastName']
        emailId = data['emailId']

        dataDict = {
            "id": _id,
            "firstName": firstName,
            "lastName": lastName,
            "emailId": emailId
        }
        return jsonify(dataDict)
    else:
        return jsonify({'message': 'User not found'})

# Route for updating a user by id
@app.route('/users/<string:id>', methods=['PUT'])
def update_user(id):
    body = request.json
    firstName = body["firstName"]
    lastName = body["lastName"]
    emailId = body["emailId"]

    db['users'].update_one(
        {"_id": ObjectId(id)},
        {"$set": {"firstName": firstName, "lastName": lastName, "emailId": emailId}}
    )

    return jsonify({'status': 'User updated successfully'})

# Route for deleting a user by id
@app.route('/users/<string:id>', methods=['DELETE'])
def delete_user(id):
    db["users"].delete_many({"_id": ObjectId(id)})
    return jsonify({
        "status": "User deleted successfully",
    })

if __name__ == '__main__':
    app.run(debug=True, port=5001)
