import bcrypt
import base64
import hashlib
import os
from cryptography.fernet import Fernet

e = Fernet(os.getenv("KEY"))


def encpwd(pwd):
    print(f'From encpwd: {pwd} is type {type(pwd)}')
    return bcrypt.hashpw(base64.b64encode(hashlib.sha256(pwd.encode()).digest()), bcrypt.gensalt()).decode()


def checkpwd(x, y):

    return bcrypt.checkpw(base64.b64encode(hashlib.sha256(x.encode()).digest()), y.encode())


def enc(txt: str) -> str:
    print(f'From enc: {txt} is type {type(txt)}')

    return e.encrypt(txt.encode()).decode()


def dec(txt: str) -> str:
    print(f'From dec: {str} is type {type(str)}')

    return e.decrypt(txt.encode()).decode()