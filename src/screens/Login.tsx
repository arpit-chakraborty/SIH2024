import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Pressable, Platform, TouchableOpacity, Image } from 'react-native'
import React, {useContext, useState} from 'react'

//Snackbar
import Snackbar from 'react-native-snackbar'

//context API
import {AppwriteContext} from '../appwrite/AppwriteContext'

// Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../routes/AuthStack';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>




const Login = ({navigation}: LoginScreenProps) => {
  const {appwrite,isLoggedIn, setIsLoggedIn} = useContext(AppwriteContext);

  const [error, setError] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    if (email.length < 1 || password.length < 1) {
      setError('All fields are required')
    } else {
      const user = {
        email,
        password
      }
      appwrite
      .login(user)
      .then((response) => {
        if (response) {
          setIsLoggedIn(true);
          Snackbar.show({
            text: 'Login Success',
            duration: Snackbar.LENGTH_SHORT
          })
          console.log(isLoggedIn)
        }
      })
      .catch(e => {
        console.log(e);
        setEmail('Incorrect email or password')
        
      })
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}
      onPress={() => navigation.goBack()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
      <Image 
        source={require('../../assets/logo.png')} // Replace with actual logo URL
        style={styles.logo}
      />
      <Text style={styles.title}>LogIn to Start</Text>

      
      <Text style={styles.label}>Username or Email</Text>
      <TextInput 
        style={styles.input}
        value={email}
        onChangeText={text => {
          setError('');
          setEmail(text);
        }}
        placeholder="Enter Email"
        placeholderTextColor="#000"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput 
        style={styles.input}
        value={password}
        onChangeText={text => {
          setError('');
          setPassword(text);
        }}
        placeholder="Enter your password"
        placeholderTextColor="#000"
        secureTextEntry
      />
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotText}>Forgot?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton}
      onPress={handleLogin}
       >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>Don’t have an account?</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupLink}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD700', // Yellow background
    alignItems: 'center',
    paddingTop: 50,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  backArrow: {
    fontSize: 30,
    color: '#000',
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366', // Dark blue color
    marginBottom: 40,
  },
  continueText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 40,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#000',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginRight: 40,
  },
  forgotText: {
    color: '#000',
    fontWeight: 'bold',
  },
  loginButton: {
    width: '80%',
    backgroundColor: '#003366',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    fontSize: 16,
    marginTop: 20,
    color: '#000',
  },
  signupLink: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Login