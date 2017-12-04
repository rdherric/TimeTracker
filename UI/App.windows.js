import React, { Component, View } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/config/store';
import { TaskTab } from './app/components/presentation/TaskTab';

// Top level App function
class App extends Component{
    render() {
        return (
            <Provider store={store}>
                <TaskTab />
            </Provider>
        );
    }
}

// Export the App function
export default App;

// Stylesheet
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
*/