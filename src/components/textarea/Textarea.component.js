import React from 'react';

function TextareaComponent(props) {
    const { className='', placeholder='', onChange = () =>{}, value='' } = props;
    return (
        <div className={className}>
            <textarea
                onChange={ (e) => onChange(e) }
                className="textarea"
                value={ value }
                placeholder={placeholder}
            ></textarea>
        </div>

    );
}

export default TextareaComponent;
