import React, { useEffect, useState } from 'react';
import DialogAPI from './DialogAPI';
import ReactDom from "react-dom";

/*
* type 默认是pop  prompt
*
* */

function DialogComponent(props) {
    const {type='pop'} = props.props;

    const [show, setShow] = useState(props.props.show);
    function dialogStatusHandle(status) {
        setShow(status.show)
    }

    useEffect(() => {
        DialogAPI.subscribeToFriendStatus(
            dialogStatusHandle,
            props.props.closeCallback,
            props.props.determineCallback
        );

        return () => {
            DialogAPI.unsubscribeFromFriendStatus();
        }
    }, []);

    function createElement() {
        return (
            <div
                className={`dialog ${show ? 'dialog--open' : 'dialog--close'} ${props.props.className !== undefined ? props.props.className : ''}`}
            >
                <div className="dialog__overlay"></div>
                <div className={`dialog__content  ${type === 'prompt' ? 'dialog-prompt' : '' }`}>
                    <div
                        onClick={ () => DialogAPI.close() }
                        className="dialog-clear-btn iconfont icon-add-icon">
                    </div>
                    <div className="dialog-center">
                        {
                            type !== 'prompt' ? <div className="dialog-center-title">
                                {
                                    props.props.title === undefined ?
                                        <h4 className="title-text">{ props.props.titleText }</h4>
                                        : props.props.title
                                }
                            </div> : null
                        }

                        {
                            type !== 'prompt' ? props.props.children : <div className="prompt-cnt">{props.props.children}</div>
                        }

                        <div className="dialog-center-btn">
                            <div
                                onClick={ () => DialogAPI.close() }
                                className="btn btn-l ui-btn ui-cancel-btn">取消</div>
                            <div
                                onClick={ () => DialogAPI.determine() }
                                className={`btn btn-r ${type === 'prompt' ? 'ui-delete-btn' : 'ui-btn' } `}>确定</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        ReactDom.createPortal(
            createElement(),
            document.body
        )
    );
}

export default DialogComponent;
