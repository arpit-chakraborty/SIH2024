import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import {AuthProvider} from './appwrite/AuthContext'
import { AppProvider } from './AppContext';

import {Router} from './routes/Router'

function App(): JSX.Element {


  return (
    <AuthProvider>
      <AppProvider>
        <Router />
      </AppProvider>
    </AuthProvider>
  );
}


export default App;