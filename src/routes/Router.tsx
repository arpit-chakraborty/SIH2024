// Router.tsx
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthContext } from '../appwrite/AuthContext';
import Loading from '../components/Loading';

import { AuthStack } from './AuthStack';
import AppStack2 from './AppStack2';

export const Router = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<{unique_id: string} | null>(null);
  const { userToken, getCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
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
      {userToken && currentUser ? <AppStack2 /> : <AuthStack />}
    </NavigationContainer>
  );
};
