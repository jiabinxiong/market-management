import React from 'react';

function TextareaComponent(props) {
    const { className='', placeholder='' } = props;
    return (
        <div className={className}>
            <textarea
                className="textarea"
                placeholder={placeholder}
            ></textarea>
        </div>

    );
}

export default TextareaComponent;
