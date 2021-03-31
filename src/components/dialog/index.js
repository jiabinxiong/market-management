import React from 'react';

import DialogComponent from './Dialog.component';

const Dialog = (props) => {
    if(props.show) {
        return <DialogComponent props={props} />
    } else {
        return null;
    }

}

export default Dialog;
