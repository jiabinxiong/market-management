import React from 'react';

import './loading.less';

function LoadingComponent(props) {
    const { className='' } = props;
    return (
        <div className={`lds-ring ${className}`}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default LoadingComponent;
