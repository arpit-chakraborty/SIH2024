import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import {AppwriteProvider} from './appwrite/AppwriteContext'

import {Router} from './routes/Router'
import HomeScreen from './screens/Home2';

function App(): JSX.Element {


  return (
    <AppwriteProvider>
      <HomeScreen />
    </AppwriteProvider>
  );
}


export default App;