import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes/index';
import {AuthProvider} from './src/contexts/AuthContext';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar
          backgroundColor="#1d1d2e"
          barStyle="light-content"
          translucent={false}
        />

        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
