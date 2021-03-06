import React from 'react';
import { Provider } from 'react-redux';

import store from '../store/store';

import RouterIndex from '../router/index';

const App = (props) => (
    <Provider store={store} >
        <RouterIndex/>
    </Provider>
);

export default App;
