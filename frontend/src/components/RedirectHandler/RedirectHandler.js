import React from 'react';
import {Redirect} from 'react-router-dom';
import {check} from 'components/LoginHandler/LoginHandler.js';


function redirectHandler() {
    if (check()) {
        <Redirect from ="/" to="/student/dashboard" />
    };
};

export default redirectHandler;
