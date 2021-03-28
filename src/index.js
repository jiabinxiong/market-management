import React from 'react';
import { render } from 'react-dom';

import 'antd/dist/antd.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './less/index.less';


import App from '../src/pages/App';

render(
    <App/>,
    document.getElementById('app')
);
