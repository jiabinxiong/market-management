import React from 'react';
import { render } from 'react-dom';

import './less/base.less';
import './less/ui/ui-li-form.less';
import './less/ui/ui-btn.less';
import './less/ui/ui-upload.less';
import 'antd/dist/antd.css';
import './less/iconfont.less';
import './less/ui/ui-table.less';
import 'react-perfect-scrollbar/dist/css/styles.css';

import App from '../src/pages/App';

render(
    <App/>,
    document.getElementById('app')
);