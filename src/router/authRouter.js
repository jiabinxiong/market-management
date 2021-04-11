import React from 'react';
import {
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import Cookies from "js-cookie";

export default () => {
    let location = useLocation();
    let token = Cookies.get('token');


    let { from } = location.state || { from: { pathname: "/home/market" } };
    if(token) {
        return <Redirect to={from} />;
    }
}
