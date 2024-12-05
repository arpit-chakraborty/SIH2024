// AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from './AuthService'; // Import your AuthService

// Define types for the context
interface AuthContextType {
  userToken: string | null;
  login: (id: string, password: string) => Promise<void>;
  signup: (id: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<User | null>;
}

export const AuthContext = createContext<AuthContextType>(
  {
    userToken: null,
    login: async () => {},
    signup: async () => {},
    logout: async () => {},
    getCurrentUser: async () => null,
  }
);

interface User {
  unique_id: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<User | null>(null);

  // Function to handle login
  const login = async (id: string, password: string) => {
    try {
      const response = await AuthService.login({ id, password });
      const token = response.token;
      await AsyncStorage.setItem('userToken', token);
      setUserToken(token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };


  // Function to handle signup
  const signup = async (id: string, password: string) => {
    try {
      const response = await AuthService.signup({ id, password });
      const token = response.token;
      await AsyncStorage.setItem('userToken', token);
      setUserToken(token);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  // Function to handle logout
  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    setUserToken(null);
  };

  // Check if the user is logged in when the app loads
  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setUserToken(token);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  const fetchUserDetails = async (token: string) => {
    try {
      const userData = await AuthService.getUserDetails(token); // Implement this in your AuthService
      setUserDetails(userData);
      return userData;
    } catch (error) {
      console.error('Failed to fetch user details:', error);
      return null;
    }
  };

  const getCurrentUser = async (): Promise<User | null> => {
    if (userDetails) {
      return {unique_id:  userDetails.unique_id};
    }
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const userData = await fetchUserDetails(token);
        return {unique_id:  userData.unique_id};
      }
    } catch (error) {
      console.error('Error retrieving current user:', error);
    }
    return null;
  };

  useEffect(() => {
    checkLoginStatus(); // Run once on app load
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, login, signup, logout, getCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
