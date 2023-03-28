import React from 'react';
import {ActivityIndicator, SafeAreaView} from 'react-native';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import {AuthContext} from '../contexts/AuthContext';

function Routes() {
  const {isAuthenticated, loading} = React.useContext(AuthContext);

  if (loading) {
    return (
      <SafeAreaView
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          backgroundColor: '#f5f7fb',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={60} color="#1D1D2E" />
      </SafeAreaView>
    );
  }

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
}
export default Routes;
