import React from 'react';
import Cookies from 'js-cookie';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginPage from '../pages/login/Login.page';
import HomePage from '../pages/home/Home.page';
import NoPage from '../pages/no/No.page';

const PrivateRoute = ({ component: Component, ...rest }, props) => {
    return <Route {...rest} render={props => {
        return Cookies.get('token') != undefined? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    }

    }/>
};

const RouterSwitch = () => (
    <Switch>
        <Route exact path="/login" component={ LoginPage }/>
        <PrivateRoute path="/home" component={ HomePage } />
        <Route paht="*" component={ NoPage } />
    </Switch>
);

export default RouterSwitch;
