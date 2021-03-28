import React from 'react';

export default function IptComponent(props) {
    const { onChange, className, type = 'text', placeholder = '', value='', disabled='' } = props;

    return (
        <div className={`ui-ipt ${className !== undefined ? className : ''}`}>
            <input
                type={ type !== 'text' ? type : 'text' }
                disabled={disabled !== '' ? disabled : ''}
                onChange={ onChange !== undefined ? onChange : () => {} }
                placeholder={ placeholder !== '' ? placeholder : '' }
                value={ value !== '' ? value : '' }
                className="ipt"/>
        </div>
    );
}
