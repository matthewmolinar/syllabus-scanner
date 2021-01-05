# Novelica Technologies
## Walkthrough by Matthew
## PART ONE:
The first thing you’ll want to do is clone the repo onto your own machine. Don’t worry about initializing the virtualenv, since it's already installed. You just need to activate it. 

#### File Structure at a glance
```
Novelica/
 backend/
  app.py
  security.py
 frontend/
  public/
  src/
 novelica/  (HIDDEN)
```

## Overview
Now, before we actually run the app, there are some things we need to discuss. For instance, the actual build running on [NovelicaTech](https://novelicatech.com) is not in this repository. This was achieved by putting the path to the folder holding the live build in the .gitignore file. These kind of files (.gitignore) are used to keep certain things about your public code private. This is a common practice, and useful if we decide we want to publish this code. (I’m contemplating it, so VC's can see.) So, now that you know this, there are two things in the .gitignore, which I encourage you to inspect.

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
This is where I keep the live build running. But more specifically, it's a file with *a repository*. The way this actually works, is I'll put the
newly generated ```build``` file created from the ```frontend/``` and then I'll stick it in ```novelica/``` and alter ```app.py``` a little so
that it runs with the static build files. Then, I'll commit it, and push it to Heroku using their CLI.

# Now For The Tour
Let's get you up and running. Before we look at the code, let's just get this thing off the ground and let you mess around with it. 
Right now, ```backend/``` doesn't have a build in it. So go on over to ```frontend/``` and run a build.

```
cd frontend/
npm run build
```

This step will take about 1-2 minutes, so sit back and relax. This is usually what it takes to make the build for the live repo.
Okay, now once it's done, you'll want to move the newly created ```build``` directory made in the frontend to the backend.

```
mv build ../backend
```
Alright. Almost there.
First, before we forget, let's initialize our virtual environment. Before you do so, you'll need to be in the backend, since the venv is located there.
```
cd ../backend
source venv/bin/activate
```

Now, before we can run ```app.py```, we need to make some changes. Luckily, I have them commented out, so all you need to do is un-comment them.
Tip: You can do that by using <kbd>Cmd</kbd> + <kbd>/</kbd>

```python
# ROUTES. 
@app.route("/<a>")
def react_routes(a):
    return app.send_static_file("index.html")

@app.route("/")
def react_index():
    return app.send_static_file("index.html")
```
Now, the moment you've been waiting for.
```
python3 app.py
```
Open up Chrome, and navigate to [localhost:5000](http://localhost:5000)

# How to Begin Creating
# Frontend
After cloning the repo onto your machine, run these commands for the frontend:
```
cd frontend
yarn add/npm install
```
After this, open up your code editor on your machine and make these changes:
 1. Open ``` src/views/StudentDashboard/StudentDashboard.js ```
 2. Scroll down to line 173 and change the line to this:
  ```
  <form onSubmit={uploadFile} id="files_input">
  ```
 3. From there, you will need to delete the ``` material-dash ``` folder from your project, and you will need to change
 every instance of ``` @material-dash ``` in the project. Here is the best way to do it:
  ```
  1. Type this command: "CMD + SHIFT + F"
  2. Type @material-dash in the top line
  3. Click the down arrow next to the Search bar
  4. Type @material-ui into the Replace bar
  5. Finally, click the Replace All button next to the Replace bar
  ```
 4. Finally, run the command
  ```
  yarn start/npm start
  ```
Navigate to your browser, and begin hacking!


# Backend
If your server keeps restarting even if you run ``` python3 app.py ``` command, simply replace line 259 of app.py with this code:
 ```
 app.run()
 ```
