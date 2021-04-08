import React from 'react';

function WrapComponent(props) {
    return (
        <div className="ui-wrap">
            <p className="text">{props.text}</p>
        </div>
    )
}

export default WrapComponent;
