from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'thisisecret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///aevellion.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


db = SQLAlchemy(app)

class User(db.Model):
    # Mention to the team about what you need to do
    # for SQLAlchemy to have an instance of db. It's in the settings.json of .vscode
    id = db.Column(db.Integer, primary_key=True)
    # We dont want the public ids to match up with the ids internally
    public_id = db.Column(db.String(50), unique=True)
    firstname = db.Column(db.String(24))
    lastname = db.Column(db.String(24))
    email = db.Column(db.String(64))
    password = db.Column(db.String(64))
    admin = db.Column(db.Boolean)

# RECOMMENDED CLASS
# CURRENTLY DOING THIS FOR TEXT.
class Syllabus(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # pdf ?
    # word ? 
    # class_name 
    # test_dates
    # hw_dates 
    # quiz_dates 
    text = db.Column(db.String(50))
    user_id = db.Column(db.Integer)

# RECOMMENDED CLASS.
class Calendar(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # the .ics file
    user_id = db.Column(db.Integer)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message' : 'Token is missing!', 'success': False}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], 'HS256')
            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except Exception as token_error:
            return jsonify({'message' : f'Token is invalid! {token_error}', 'success': False}), 401
        return f(current_user, *args, **kwargs)
    return decorated

@app.route('/student/checktoken')
def check_token(current_user):
    return jsonify({'success': True})

@app.route('/user', methods=['GET'])
@token_required
def get_all_users(current_user):
    if not current_user.admin:
        return jsonify({'message' : 'Cannot perform that function!'})
    users = User.query.all()
    output = []
    for user in users:
        user_data = {}
        user_data['public_id'] = user.public_id
        user_data['firstname'] = user.firstname
        user_data['lastname'] = user.lastname
        user_data['email'] = user.email
        user_data['password'] = user.password
        user_data['admin'] = user.admin
        output.append(user_data)
    return jsonify({'users' : output})


@app.route('/user/<public_id>', methods=['GET'])
@token_required
def get_one_user(current_user, public_id):
    if not current_user.admin:
        return jsonify({'message' : 'Cannot perform that function!'})
    user = User.query.filter_by(public_id=public_id).first()
    if not user:
        return jsonify({'message' : 'No user found!'})
    user_data = {}
    user_data['public_id'] = user.public_id
    user_data['firstname'] = user.firstname
    user_data['lastname'] = user.lastname
    user_data['email'] = user.email
    user_data['password'] = user.password
    user_data['admin'] = user.admin
    return jsonify({'user' : user_data})

@app.route('/user', methods=['POST'])
@token_required
def create_user(current_user):
    if not current_user.admin:
        return jsonify({'message' : 'Cannot perform that function!'})
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(public_id=str(uuid.uuid4()), firstname=data['firstname'],
        lastname=data['lastname'], email=data['email'], password=hashed_password, admin=False)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message' : 'New user created.'})

@app.route('/user/<public_id>', methods=['PUT'])
@token_required
def promote_user(current_user, public_id):
    if not current_user.admin:
        return jsonify({'message' : 'Cannot perform that function!'})
    user = User.query.filter_by(public_id=public_id).first()
    if not user:
        return jsonify({'message' : 'User not found.'})
    user.admin = True
    db.session.commit()
    return jsonify({'message' : f'{user.firstname} {user.lastname} has been promoted.'})

@app.route('/user/<public_id>', methods=['DELETE'])
@token_required
def delete_user(current_user, public_id):
    if not current_user.admin:
        return jsonify({'message' : 'Cannot perform that function!'})
    user = User.query.filter_by(public_id=public_id).first()
    if not user:
        return jsonify({'message' : 'User not found.'})
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message' : f'{user.firstname} {user.lastname} has been deleted.'})

@app.route('/student/login', methods=["POST"])
def login():
    # ONLY THIS ROUTE WILL WORK WITHOUT TOKEN OR BEING ADMINS.
    try:
        user_email = request.json['email']
        password = request.json['password']
    # if not email or not password:
    #     return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!'})
        user = User.query.filter_by(email=user_email).first()
        if not user:
            return jsonify({"error": "Invalid credentials", 'login': False})
        if check_password_hash(user.password, password):
            token = jwt.encode({'public_id' : user.public_id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)},
                app.config['SECRET_KEY'], 'HS256')
            return jsonify({'token' : token, 'login': True})
    except Exception as login_error:
        return jsonify({"error": f"Invalid credentials {login_error}", 'login': False})

@app.route('/syllabus')
@token_required
def get_all_syllabi(current_user):
    return ''

@app.route('/syllabus/<syllabus_id>', methods=['GET'])
@token_required
def get_one_syllabus(current_user, syllabus_id):
    return ''

@app.route('/syllabus', methods=['POST'])
@token_required
def create_syllabus(current_user):
    data = request.get_json()
    new_syllabus = Syllabus(text=data['text'], user_id=current_user.id)
    db.session.add(new_syllabus)
    db.session.commit()
    return jsonify({'message' : 'New syllabus created.'})

@app.route('/syllabus/<syllabus_id>', methods=['PUT'])
@token_required
def change_syllabus(current_user, syllabus_id):
    return ''

@app.route('/syllabus/<syllabus_id>', methods=['DELETE'])
@token_required
def delete_syllabus(current_user, syllabus_id):
    return ''

if __name__ == '__main__':
    app.run(debug=True)