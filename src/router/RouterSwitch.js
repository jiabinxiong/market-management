import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginPage from '../pages/login/Login.page';
import HomePage from '../pages/home/Home.page';

const RouterSwitch = () => (
    <Switch>
        <Route exact path="/login" component={ LoginPage }/>
        <Route path="/home" component={ HomePage } />
    </Switch>
);

export default RouterSwitch;
