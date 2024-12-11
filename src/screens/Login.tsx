import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Pressable, Platform, TouchableOpacity, Image } from 'react-native'
import React, {useContext, useState} from 'react'

//Snackbar
import Snackbar from 'react-native-snackbar'

//context API
import {AuthContext} from '../appwrite/AuthContext'

// Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../routes/AuthStack';
import { SafeAreaView } from 'react-native-safe-area-context';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>




const Login = ({navigation}: LoginScreenProps) => {
  const {login} = useContext(AuthContext);

  const [error, setError] = useState<string>('');

  const [id, setid] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    if (id.length < 1 || password.length < 1) {
      setError('All fields are required')
    } else {
      login(id, password);
      setError('');
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}
      onPress={() => navigation.goBack()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
      <Image 
        source={require('../../assets/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>LogIn to Start</Text>

      
      <Text style={styles.label}>Badge Number</Text>
      <TextInput 
        style={styles.input}
        value={id}
        onChangeText={text => {
          setError('');
          setid(text);
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
    paddingTop: 10,
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
    width: 140,
    height: 150,
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
    color: '#000',
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
    backgroundColor: '#000',
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
    color: '#FFF',
  },
  signupLink: {
    color: '#0000FF',
    fontWeight: 'bold',
  },
});

export default Login