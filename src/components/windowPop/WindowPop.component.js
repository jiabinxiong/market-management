import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';

import './windowPop.less';
import { WindowPopAPI } from '../../effectAPI';

/*
*  className
*  visible 是否打开
*  title 可自定义
*  determineSuccess 默认 false 主要用于接口提交 如果不需要提交则不需要
* */

export default function WindowPopComponent(props) {
    const [ visible, setVisible] = useState(props.visible);
    const [ showAnimation, setShowAnimation ] = useState(true);

    function popStatusHandle(status) {

        if(status.visible !== undefined) {
            setVisible(status.visible);
        } else {
            setShowAnimation(status.showAnimation);
        }
    }

    useEffect(() => {
        WindowPopAPI.subscribeToFriendStatus(
            popStatusHandle,
            props.popCloseCallback,
            props.popDetermineCallback
        );

        return () => {
            WindowPopAPI.unsubscribeFromFriendStatus(
                popStatusHandle,
                props.popCloseCallback,
                props.popDetermineCallback
            );
        }
    }, [
        props.visible,
        props.popCloseCallback,
        props.popDetermineCallback
    ]);

    function createElement() {
        console.log('xxxxxx');
        return (
            <div id="somedialog"
                 className={`dialog ${showAnimation ? 'dialog--open' : 'dialog--close '} ${props.className !== undefined ? props.className : ''}`}>
                <div className="dialog__overlay"></div>
                <div className="dialog__content">
                    <div
                        onClick={ () => WindowPopAPI.close() }
                        className="dialog-clear-btn iconfont icon-add-icon">
                    </div>
                    <div className="dialog-center">
                        <div className="dialog-center-title">
                            { props.title === undefined ? <h4 className="title-text">标题</h4> : props.title }
                        </div>
                        <div>
                            { props.children }
                        </div>
                        <div className="dialog-center-btn">
                            <div
                                onClick={ () => WindowPopAPI.close('cancel') }
                                className="btn btn-l ui-btn ui-cancel-btn">取消</div>
                            <div
                                onClick={ () => WindowPopAPI.determine()}
                                className="btn btn-r ui-btn">确定</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    if(visible) {
        return (
            ReactDom.createPortal(
                createElement(),
                document.body
            )
        );
    } else {
        return null;
    }

}


