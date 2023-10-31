from flask import Flask,request,jsonify
from flask_cors import CORS
import shortuuid
import json


app=Flask(__name__)
CORS(app)

def load_data():
    try:
        with open('emails.json', 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return []

def save_data(data):
    with open('emails.json', 'w') as file:
        json.dump(data, file, indent=4)

def load_all_users():
    try:
        with open('users.json', 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return {}

def save_new_user(users):
    with open('users.json', 'w') as file:
        json.dump(users, file, indent=4)

allmail = load_data()
allusers=load_all_users()

@app.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    print(f'data',data)
    if "user" in data and "password" in data:
        user = data["user"]
        password = data["password"]
        
        if user in allusers and allusers[user] == password:
            return jsonify({"message": "User logged in successfully", "status": "200", "email": user})
        else:
            return jsonify({"message": "Invalid email or password", "status": "400"})
    else:
        return jsonify({"message": "No data found", "status": "400"})

    

@app.route("/signup", methods=['POST'])
def signup():
    data = request.get_json()
    if "user" in data and "password" in data:
        user = data["user"]
        password = data["password"]
        if user in allusers:
            return jsonify({"message": "User already exists"})
        else:
            allusers[user] = password
            save_new_user(allusers)
            return jsonify({"message": "Account created successfully", "email": user})
    else:
        return jsonify({"message": "Enter a valid email and password"})

            

@app.route("/allmail")
def mail():
    return {"allmail":allmail}


@app.route('/add-mail', methods=['POST'])
def add_mail():
    data=request.get_json()
    length=len(allmail)
    print(f'{data}')
    new_mail = {
        "id": shortuuid.uuid(),
        "sender": data["sender"],
        "receiver": data["receiver"],
        "subject": data["subject"],
        "body": data["body"],
        "read": data["read"],
        "deleted": {
            data["sender"]: data["deleted"].get(data["sender"], False),
            data["receiver"]: data["deleted"].get(data["receiver"], False)
        },
        "star": {
            data["sender"]: data["star"].get(data["sender"], False),
            data["receiver"]: data["star"].get(data["receiver"], False)
        },
        "time":data["time"],
        "date":data["date"]
    }
    print('data',new_mail)
    allmail.append(new_mail)
    save_data(allmail)
    if length<len(allmail):
        return jsonify({"message":"member added successfully"})
    return jsonify({"message":"could not add member 400"})

@app.route('/update-mail', methods=['PUT'])
def update_mail():
    data=request.get_json()
    if "usermail" in data:
        user=data["usermail"]
    if "id" in data:
        desired_id=data["id"]
        for mail in allmail:
            if mail["id"]==desired_id:
                if "read" in data:
                    mail["read"]=data["read"]
                    save_data(allmail)
                    return jsonify({"message":"member read successfully"})
                elif "star" in data:
                    mail["star"][user]=data["star"]
                    save_data(allmail)
                    return jsonify({"message":"member starred successfully"})
                elif "deleted" in data:
                    mail["deleted"][user]=data["deleted"]
                    save_data(allmail)
                    return jsonify({"message":"member deleted successfully"})
                else:
                    return jsonify({"message":"could not update due to missing data"})
    return jsonify({"message":"could not update member 400"})


 

if __name__=="__main__":
    app.run(debug=True)



  