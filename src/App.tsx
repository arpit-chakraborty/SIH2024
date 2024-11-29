import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import {AppwriteProvider} from './appwrite/AppwriteContext'

import {Router} from './routes/Router'

function App(): JSX.Element {


  return (
    <AppwriteProvider>
      <Router />
    </AppwriteProvider>
  );
}


export default App;