import React, { AppRegistry, Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/config/store';
import { App } from './App';

class TimeTracker extends Component {
    // Render function
    render() { 
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('TimeTracker', () => App);

