from flask import Flask,request,jsonify
from flask_cors import CORS
import shortuuid
app=Flask(__name__)
CORS(app)


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
        }
    }

    allmail.append(new_mail)
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
                    return jsonify({"message":"member updated successfully"})
                elif "star" in data:
                    mail["star"][user]=data["star"]
                    return jsonify({"message":"member updated successfully"})
                elif "deleted" in data:
                    mail["deleted"][user]=data["deleted"]
                    return jsonify({"message":"member updated successfully"})
                else:
                    return jsonify({"message":"could not update due to missing data"})
    return jsonify({"message":"could not update member 400"})


 

if __name__=="__main__":
    allmail=[
        {
        "id": shortuuid.uuid(),
        "sender": "pujarasuchi386@gmail.com",
        "receiver": "suchibankoti95@gmail.com",
        "subject": "test subject 1",
        "body": "random text for mail blank space fill it with wortds taht dont mean anyhting",
        "read":False,
        "deleted": {
            "pujarasuchi386@gmail.com": False,
            "suchibankoti95@gmail.com":False
        },
        "star": {
            "pujarasuchi386@gmail.com": False,
            "suchibankoti95@gmail.com":False
        }
    },
    {
       "id": shortuuid.uuid(),
        "sender": "pujarasuchi386@gmail.com",
        "receiver": "suchibankoti95@gmail.com",
        "subject": "test subject 2",
        "body": "random text for mail blank space fill it with wortds taht dont mean anyhting",
        "read":False,
        "deleted": {
            "pujarasuchi386@gmail.com": False,
            "suchibankoti95@gmail.com":False
        },
        "star": {
            "pujarasuchi386@gmail.com": False,
            "suchibankoti95@gmail.com":False
        }
    },
    {
       "id": shortuuid.uuid(),
        "sender":"suchibankoti95@gmail.com",
        "receiver": "pujarasuchi386@gmail.com",
        "subject": "test subject 3",
        "body": "random text for mail blank space fill it with wortds taht dont mean anyhting",
        "read":False,
        "deleted": {
            "pujarasuchi386@gmail.com": False,
            "suchibankoti95@gmail.com":False
        },
        "star": {
            "pujarasuchi386@gmail.com": False,
            "suchibankoti95@gmail.com":False
        }
    },
    {
       "id": shortuuid.uuid(),
        "sender": "suchibankoti95@gmail.com",
        "receiver": "pujarasuchi386@gmail.com",
        "subject": "test subject 4",
        "body": "random text for mail blank space fill it with wortds taht dont mean anyhting",
        "read":False,
        "deleted": {
            "pujarasuchi386@gmail.com": False,
            "suchibankoti95@gmail.com":False
        },
        "star": {
            "pujarasuchi386@gmail.com": False,
            "suchibankoti95@gmail.com":False
        }
    }
    ]
    app.run(debug=True)



  