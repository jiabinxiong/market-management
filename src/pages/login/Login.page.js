import React from 'react';
import { Link } from 'react-router-dom';

import '../../less/login/login.less';

export default class LoginPage extends React.Component {
    render() {
        return (
            <div className="login">
                <div className="login-area">
                    <div className="login-title">
                        <h1 className="title">蔬果市场后台</h1>
                        <p className="text">您买到了蔬果吗？ 您应该是没有找到蔬果市场， 快来下载app吧</p>
                    </div>
                    <div className="login-ipt">
                        <ul className="ul ui-ul-form">
                            <li className="li ui-li-form">
                                <label className="li-label-form ui-li-label-form">用户名:</label>
                                <div className="li-block-form ui-li-block-form">
                                    <div className="childer-form ui-li-block-childer-form">
                                        <input className="ui-li-form-ipt" type="text" placeholder="请输入用户名"/>
                                    </div>                                    
                                    <p className="prompt-text-form-ipt ui-li-prompt-text-form-ipt">请输入用户名</p>
                                </div>
                            </li>
                            <li className="li ui-li-form">
                                <label className="li-label-form ui-li-label-form">密 &nbsp;&nbsp;&nbsp;码:</label>
                                <div className="li-block-form ui-li-block-form">
                                    <div className="childer-form ui-li-block-childer-form">
                                        <input className="ipt ui-li-form-ipt" type="text" placeholder="请输入密码"/>
                                    </div>                                    
                                    <p className="prompt-text-form-ipt ui-li-prompt-text-form-ipt">请输入用户名</p>
                                </div>                                
                            </li>
                        </ul>
                    </div>
                    <div className="login-btn">
                        <div className="btn">
                            <Link to="/home">
                                登录
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}