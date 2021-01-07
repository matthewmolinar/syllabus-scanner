import dotenv
dotenv.load_dotenv()
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
import os, json, boto3
from flask_cors import CORS
import re
import security
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, \
    jwt_refresh_token_required, create_refresh_token, get_raw_jwt

# Defining the app itself.
app = Flask(__name__, static_folder="build", static_url_path="/")

# Configuring the upload functionality
# If you add a file larger than 1MB, the application will refuse it.
app.config['MAX_CONTENT_LENGTH'] = 1024 * 1024
# Making sure nobody tries to hack us lol.
app.config['UPLOAD_EXTENSIONS'] = ['.pdf', '.docx']
# This is where we will be keeping syllabi for now in the backend.
app.config['UPLOAD_PATH'] = 'uploads'

# Configuring the database file.
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///aevellion.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# Need to turn this into a ENV variable through dotenv.
app.config["JWT_SECRET_KEY"] = "myawesomesecretisnevergonnagiveyouup"
# app.config["JWT_BLACKLIST_ENABLED"] = True
# app.config["JWT_BLACKLIST_TOKEN_CHECKS"] = ["access", "refresh"]
jwt = JWTManager(app)
CORS(app)


# DB
db = SQLAlchemy(app)
class User(db.Model):
    id = db.Column('student_id', db.Integer, primary_key = True) # primary_key makes it so that this value is unique and can be used to identify this record.
    firstname = db.Column(db.String(24))
    lastname = db.Column(db.String(24))
    email = db.Column(db.String(64))
    pwd = db.Column(db.String(64))

    # Constructor
    def __init__(self, firstname, lastname, email, pwd):
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.pwd = pwd


# CRUD (Create, Read, Update, Destroy)
def getUsers():
    users = User.query.all()
    return [{"id": i.id, "firstname": i.firstname, "lastname": i.lastname, "email": i.email, "password": i.pwd} for i in users]


def getUser(uid):
    users = User.query.all()
    user = list(filter(lambda x: x.id == uid, users))[0]
    return {"id": user.id, "firstname": user.firstname, "lastname": user.lastname, "email": user.email, "password": user.pwd}


def addUser(firstname, lastname, email, pwd):
    try:
        user = User(firstname, lastname, email, pwd)
        db.session.add(user)
        db.session.commit()
        return True
    except Exception as e:
        print(e)
        return False


def removeUser(uid):
    try:
        user = User.query.get(uid)
        db.session.delete(user)
        db.session.commit()
        return True
    except Exception as e:
        print(e)
        return False


# def allowed_file(filename):
#     return '.' in filename and \
#         filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# ROUTES. 
@app.route("/<a>")
def react_routes(a):
    return app.send_static_file("index.html")

@app.route("/")
def react_index():
    return app.send_static_file("index.html")
    
class InvalidToken(db.Model):
    __tablename__ = "invalid_tokens"
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String)

    def save(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def is_invalid(cls, jti):
        q = cls.query.filter_by(jti=jti).first()
        return bool(q)


# @jwt.token_in_blacklist_loader
# def check_if_blacklisted_token(decrypted):
#     jti = decrypted["jti"]
#     return InvalidToken.is_invalid(jti)
    

@app.route("/api/login", methods=["POST"])
def login():
    try:
        email = request.json["email"]
        password = request.json["password"]
        if email and password:
            user = list(filter(lambda x: security.dec(x["email"]) == email and security.checkpwd(password, x["password"]), getUsers()))
            # Check if user exists
            if len(user) == 1:
                token = create_access_token(identity=user[0]["id"])
                refresh_token = create_refresh_token(identity=user[0]["id"])
                return jsonify({"token": token, "refreshToken": refresh_token})
            else:
                return jsonify({"error": "Invalid credentials"})
        else:
            return jsonify({"error": "Invalid form"})
    except Exception as e:
        print(e)
        return jsonify({"error": f"Invalid form{e}"})


@app.route("/api/register", methods=["POST"])
def register():
    try:
        email = request.json["email"]
        email = email.lower()
        password = security.encpwd(request.json["password"])
        firstname = request.json["firstname"]
        lastname = request.json["lastname"]
        print(email, password, request.json["password"], firstname, lastname)
        if not (email and password and firstname and lastname):
            return jsonify({"error": "Invalid form"})
        # Check to see if user already exists
        users = getUsers()
        if len(list(filter(lambda x: security.dec(x["email"]) == email, users))) == 1:
            return jsonify({"error": "Invalid form"})
        # Email validation check
        if not re.match(r"[\w._]{5,}@\w{3,}\.\w{2,4}", email):
            return jsonify({"error": "Invalid email"})
        addUser(firstname, lastname, security.enc(email), password)
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"error": f"Invalid form{e}"})


@app.route("/api/checkiftokenexpire", methods=["POST"])
@jwt_required
def check_if_token_expire():
    return jsonify({"success": True})


@app.route("/api/refreshtoken", methods=["POST"])
@jwt_refresh_token_required
def refresh():
    identity = get_jwt_identity()
    token = create_access_token(identity=identity)
    return jsonify({"token": token})


@app.route("/api/logout/access", methods=["POST"])
@jwt_required
def access_logout():
    jti = get_raw_jwt()["jti"]
    try:
        invalid_token = InvalidToken(jti=jti)
        invalid_token.save()
        return jsonify({"success": True})
    except Exception as e:
        print(e)
        return {"error": e}


@app.route("/api/logout/refresh", methods=["POST"])
@jwt_required
def refresh_logout():
    jti = get_raw_jwt()["jti"]
    try:
        invalid_token = InvalidToken(jti=jti)
        invalid_token.save()
        return jsonify({"success": True})
    except Exception as e:
        print(e)
        return {"error": e}


@app.route('/protected', methods=['GET'])
@jwt_required
def protected():
    # Access the identity of the current user with get_jwt_identity
    identity = get_jwt_identity()
    return jsonify(logged_in_as=identity), 200


# This is now for deployment.
# I have changed this function to only calendarify one file at a time.
# The front end will run this multiple times depending on the files.
@app.route('/api/upload', methods=['POST'])
def upload_file():
    try:
        for uploaded_file in request.files.getlist('file'):
            filename = secure_filename(uploaded_file.filename)
            if filename != '':
                file_ext = os.path.splitext(filename)[1]
                if file_ext not in app.config['UPLOAD_EXTENSIONS']:
                    return jsonify({"success": False})
                # CALEB: Get the text for the file here
                    # uploaded_file is the current file

                # Get the professor's name, and find the calendar for that class

                # CALEB: Get the ics file
                calendar = ''



                return jsonify({"calendar": calendar})
                # un-comment this if you want to do local testing. It saves the file.
                # uploaded_file.save(os.path.join(app.config['UPLOAD_PATH'], filename))
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"error": e})


# This is not needed at the moment.
# This is for s3 bucket functionality
# @app.route('/sign_s3/')
# def sign_s3():
#   S3_BUCKET = "novelica-syllabi"

#   file_name = request.args.get('file_name')
#   file_type = request.args.get('file_type')

#   s3 = boto3.client('s3')

#   presigned_post = s3.generate_presigned_post(
#     Bucket = S3_BUCKET,
#     Key = file_name,
#     Fields = {"acl": "public-read", "Content-Type": file_type},
#     Conditions = [
#       {"acl": "public-read"},
#       {"Content-Type": file_type}
#     ],
#     ExpiresIn = 3600
#   )

#   return json.dumps({
#     'data': presigned_post,
#     'url': 'https://%s.s3.amazonaws.com/%s' % (S3_BUCKET, file_name)
#   })

# This is not needed at the moment.
# @app.route('/api/pdf', methods=['POST'])
# def calendarify():
#     # Placeholder.
#     calendar = ''
#     # Make call AWS to find the file.
#     file_name = request.args.get('file_name')
#     s3 = boto3.resource('s3')
#     file = s3.Object(S3_BUCKET, file_name)



#     # PDF reading

#     # calendar return and saved in calendar variable


#     return jsonify({"calendar": calendar})
    
if __name__ == "__main__":
    app.run(debug=True) # debug=True restarts the server everytime we make a change in our code