import React from 'react';
import ReactDOM from 'react-dom';

import './pop.less';

export default class PopComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isShow: this.props.isShow,
            isTime: true
        };
    }

    closeFun() {
        this.setState({
            isTime: false
        });
        this.popTime = setTimeout(() => {
            this.setState({
                isShow: false
            });
            this.props.closeCallbackFun();
        }, 400);
    }

    closeBtn() {
        this.closeFun();
    }
    contentElement() {
        return (
            <div id="somedialog"
                 className={`dialog ${this.state.isTime ? 'dialog--open' : 'dialog--close'}`}>
                <div className="dialog__overlay"></div>
                <div className="dialog__content">
                    <div
                        onClick={() => this.closeBtn()}
                        className="dialog-clear-btn iconfont icon-add-icon">
                    </div>
                    <div className="dialog-center">
                        { this.props.children }
                    </div>
                </div>
            </div>
        );
    }
    render() {

        if(this.state.isShow) {
            return ReactDOM.createPortal(
                this.contentElement(),
                document.body
            );
        } else {
            return null;
        }
    }

    static getDerivedStateFromProps(props, state) {
        // console.log(props);
        // console.log(state);
        // if(props.isShow && !state.isShow && state.isTime || !props.isShow && state.isShow && state.isTime) {
        //     return {
        //         isShow: props.isShow
        //     };
        // }
        //
        // if(!state.isShow && !state.isTime) {
        //     return {
        //         isTime: true
        //     }
        // }

        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log(prevProps);
        // console.log(prevState);

        if(!prevProps.isShow && !prevState.isShow && prevState.isTime) {
            console.log('a');

            this.setState({
                isShow: !prevProps.isShow
            })
        }
        if(prevProps.isShow && prevState.isShow && prevState.isTime) {
            console.log('b');
            this.propsTime = setTimeout(() => {
                this.setState({
                    isShow: false
                });
            }, 400);
        }
        //
        // if(prevProps.isShow && prevState.isShow && prevState.isTime) {
        //     console.log('b');
        //
        //     this.setState({
        //         isTime: false
        //     });
        //     this.propsTime = setTimeout(() => {
        //         this.setState({
        //             isShow: false
        //         });
        //     }, 400);
        //     //
        //     // this.propsTime = setTimeout(() => {
        //     //     this.setState({
        //     //         isTime: true
        //     //     })
        //     // }, 400)
        //
        //     // this.closeFun();
        // }
    }

    componentWillUnmount() {
        clearTimeout(this.popTime);
        clearTimeout(this.propsTime);
    }
}