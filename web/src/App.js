import React from 'react';
import { Provider } from 'react-redux';

import RootNavigator from './navigations/RootNavigator';
import configureStore from "./redux/store/configureStore";

const store = configureStore();

const App = () => {
    return (
        <Provider store={store}>
            <RootNavigator/>
        </Provider>
    );
}

export default App;
