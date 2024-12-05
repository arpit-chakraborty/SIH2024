// Router.tsx
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthContext } from '../appwrite/AuthContext';
import Loading from '../components/Loading';

import { AuthStack } from './AuthStack';
import AppStack2 from './AppStack2';

export const Router = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { userToken, getCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        console.log('Current User:', currentUser);  
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setIsLoading(false);
      }
    };

    checkUser();
  }, [getCurrentUser]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {userToken ? <AppStack2 /> : <AuthStack />}
    </NavigationContainer>
  );
};
