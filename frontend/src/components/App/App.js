import React from 'react';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import SignupPage from 'views/SignupPage/SignupPage';
import Student from 'layouts/Student.js';
import {isLoggedIn} from 'components/LoginHandler/LoginHandler.js'
import NewLogout from 'views/LogoutPage/NewLogout.js';


function App() {
    const hist = createBrowserHistory();

    let [loginStatus, setLoginStatus] = React.useState(false)

    React.useEffect(() => {
        isLoggedIn().then(r => setLoginStatus(r))
    })

    return (
        <React.Fragment>
            <Router history={hist}>
                <Switch>
                    <Route path="/" exact>
                        {loginStatus ? <Student /> : <LandingPage />}
                    </Route>
                    <Route path="/landing-page" component={LandingPage} />
                    <Route path="/profile-page" component={ProfilePage} />
                    <Route path="/login-page" component={LoginPage} />
                    <Route path="/signup-page" component={SignupPage} /> 
                    <Route path="/logout" exact component={NewLogout} />
                    <Route path="/student" exact>
                        {loginStatus ? <Student /> : <LandingPage />}
                    </Route>
                    {/* <Redirect from="/student/dashboard" to ="/student" /> */}
                </Switch>
            </Router>
        </React.Fragment>

    );
}

export default App;