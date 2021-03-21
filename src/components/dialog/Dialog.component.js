import ReactDOM from 'react-dom'
import React, { Component } from 'react';

import './dialog.less';

class DialogComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true,
            show: this.props.show
        }
    }
 
    clearBtn() {        
        this.setState({
            visible: false
        });
        
        this.showTimeout = setTimeout(() => { 
            this.props.callbackFun();
            this.setState({
                show: false
            });            
        }, 450)
    }

    contentElement(is, props) {
        return (
            <div id="somedialog" 
                className={`dialog ${is ? 'dialog--open' : 'dialog--close'} ${props.className === undefined ? '' : props.className}`}>
                <div className="dialog__overlay"></div>
                <div className="dialog__content">
                    <div
                        onClick={ () => this.clearBtn() } 
                        className="dialog-clear-btn iconfont icon-add-icon">
                    </div>
                    <div className="dialog-center">
                        { props.children }
                    </div>                    
                </div>
            </div>
        );
    }

    render() { 
        if(this.state.show) {
            return ReactDOM.createPortal(
                this.contentElement(this.state.visible, this.props), 
                document.body
            )
        } else {
            return null;
        }
    }

    componentDidUpdate() {
        if(!this.state.show && this.state.visible) {
            this.setState({
                show: this.props.show,
            });
        }
        
    }
    componentWillUnmount() {
    
        this.setState = (state, callback) => {
            return
        }

        clearTimeout(this.showTimeout);
    }
}

export default DialogComponent