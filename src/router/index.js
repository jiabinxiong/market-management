import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';


import RouterSwitch from './RouterSwitch';

const RouterIndex = (props) => (
    <Router>
        <RouterSwitch/>
    </Router>
);

export default RouterIndex;