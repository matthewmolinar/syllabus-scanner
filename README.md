# Novelica Technologies
## Walkthrough
The first thing you’ll want to do is clone the repo onto your own machine. Don’t worry about initializing the virtualenv, since it's already installed. You just need to activate it. 

#### File Structure at a glance
```
Novelica/
 backend/
 frontend/
 (hidden) novelica/
```

## Overview
Now, before we actually run the app, there are some things we need to discuss. For instance, the actual build running on novelicatech.com is not in this repository. This was achieved by putting the path to the folder holding the live build in the .gitignore file. These kind of files (.gitignore) are used to keep certain things about your public code private. This is a common practice, and useful if we decide we want to publish this code. (I’m contemplating it, so VC's can see.) So, now that you know this, there are two things in the .gitignore, which I encourage you to inspect.

```
# Novelica/.gitignore
backend/.env
novelica/
```
One line one, we have the .env file. This is where we keep our local environment variables, and we specifically need this for the KEY variable. This is used for security. We definitely don’t want this on the internet, or else people might be able to crack our encoded passwords and emails.

Go ahead and make an .env file in backend.

```
cd backend && touch .env
```

Next, you will need to set the KEY variable. This is used by our security.py, and in turn our app.py. Our key is on the docs in Resources.
```
KEY=OURKEYWITHNOQUOTES
```
Okay, now that's done! We're almost ready to dive in. But wait . . You're probably wondering about ```novelica/```
This is where I keep the live build running. But more specifically, it's a file with ** a repository **.

 
