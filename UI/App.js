import React, { View } from 'react';
import { ManageTasks } from './app/components/container/ManageTasks';

// Top level App function
const App = () => (
    <View>
        <ManageTasks />
    </View>
);

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