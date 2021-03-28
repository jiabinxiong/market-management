import React from 'react';

export default function BtnComponent (props) {
    const { text, className, onClick, disabled = false  } = props;
    return (
        <div
            onClick={ onClick !== undefined && !disabled ? () => onClick() : () => {} }
            className={`ui-btn ${className !== undefined ? className : ''} ${ disabled ? 'disabled-btn' : '' }`}
        >
            { text !== undefined ? text : props.children }
        </div>
    );
}

