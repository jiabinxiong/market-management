import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { BtnComponent, IptComponent } from '../../components';

import { userAction } from '../../redux/actions';
import { userServer } from '../../service';

function LoginPage(props) {
    const loginHandle = () => {
        props.visibleLoginBtnAction(true);
        userServer.login({
            ...props.loginReducer,
            role: 0
        }).then((data) => {
            props.visibleLoginBtnAction(false);
        });
    }

    const namePswChange = (e, type) => {
        props.loginAction({
            type: type,
            value: e.target.value
        })
    };

    return (
        <div className="login">
            <div className="login-area">
                <div className="login-title">
                    <h1 className="title">蔬果市场后台</h1>
                    <p className="text">您买到了蔬果吗？ 您应该是没有找到蔬果市场， 快来下载app吧</p>
                </div>
                <div className="login-ipt">
                    <ul className="ul ui-ul-form">
                        <li className="li ui-li-form ">
                            <label className="li-label-form ui-li-label-form">
                                <span className="ui-li-label-form-required">*</span>名 称:
                            </label>
                            <div className="li-block-form ui-li-block-form">
                                <div className="ui-li-block-ipt-form">
                                    <div className="childer-form ui-li-block-childer-form">
                                        <IptComponent
                                            className="childer-form ui-li-form-ipt"
                                            type="text"
                                            placeholder="请输入用户名"
                                            onChange={ e => namePswChange(e, 'name') }
                                            value={ props.loginReducer.name }
                                        />
                                    </div>
                                </div>
                                <p className="prompt-text-form-ipt ui-li-prompt-text-form-ipt">
                                    <span className="ui-li-prompt-text-l-form-ipt">请输入名称</span>
                                </p>
                            </div>
                        </li>
                        <li className="li ui-li-form ">
                            <label className="li-label-form ui-li-label-form">
                                <span className="ui-li-label-form-required">*</span>密 码:
                            </label>
                            <div className="li-block-form ui-li-block-form">
                                <div className="ui-li-block-ipt-form">
                                    <div className="childer-form ui-li-block-childer-form">
                                        <IptComponent
                                            className="ipt ui-li-form-ipt"
                                            type="password"
                                            placeholder="请输入密码"
                                            onChange={ e => namePswChange(e, 'psw') }
                                            value={ props.loginReducer.psw }
                                        />
                                    </div>
                                </div>
                                <p className="prompt-text-form-ipt ui-li-prompt-text-form-ipt">
                                    <span className="ui-li-prompt-text-l-form-ipt">请输入密码</span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="login-btn">
                    <BtnComponent
                        onClick={ () => loginHandle() }
                        className="btn"
                        disabled={props.visibleLoginBtnReducer}
                        text="登录"/>
                </div>
            </div>
        </div>
    );
}

export default connect(
    data => ({
        loginReducer: data.loginReducer,
        visibleLoginBtnReducer: data.visibleLoginBtnReducer
    }),
    {
        loginAction: userAction.setLogin,
        visibleLoginBtnAction: userAction.visibleLoginBtn
    }
)(LoginPage);
