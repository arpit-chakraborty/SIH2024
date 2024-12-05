import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Pressable, Platform, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, {useContext, useState} from 'react'
import CheckBox from '@react-native-community/checkbox';

//react native elements
import { FAB } from '@rneui/themed'
//Snackbar
import Snackbar from 'react-native-snackbar'

//context API
import {AuthContext} from '../appwrite/AuthContext'

// Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../routes/AuthStack';

type SignupScreenProps = NativeStackScreenProps<AuthStackParamList, 'Signup'>




const Signup = ({navigation}: SignupScreenProps) => {
  const {signup} = useContext(AuthContext)

  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState<string>('')
  const [id, setid] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSignup = () => {
    if (
      id.length < 1 ||
      password.length < 1
      ) {
        setError('All fields are required');
      }else if(!isChecked){
        setError('Please accept terms and conditions')
      }
      else {
        setError('');
        signup(id,password);
      }
  };
  
  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <TouchableOpacity style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      {/* Logo */}
      <ImageBackground
        source={require('../../assets/logo.png')} // Replace with the actual logo path
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>Sign Up to Start</Text>

      {/* Input Fields */}
      <TextInput
        value={id}
        onChangeText={text => {
          setError('');
          setid(text);
        }}
        placeholderTextColor="#000"
        placeholder="Enter your Badge Number"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={text => {
          setError('');
          setPassword(text);
        }}
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={true}
        placeholderTextColor="#000"
      />

      {/* Checkbox */}
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isChecked}
          onValueChange={setIsChecked}
          style={styles.checkbox}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
          <Text style={styles.checkboxText}>
            I agree with the Terms of Service and Privacy policy
          </Text>
        </TouchableOpacity>
      </View>

      {/* Create Account Button */}
      <TouchableOpacity style={styles.createButton}
      onPress={handleSignup}>
        <Text style={styles.createButtonText}>Create Account</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Pressable
      onPress={() => navigation.navigate('Login')}>
      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text style={styles.loginText}>Login</Text>
      </Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD700', // Bright yellow
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backText: {
    fontSize: 24,
    color: '#003366', // Blue
    fontWeight: 'bold',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    marginTop: 50,
    elevation: -1
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366', // Blue
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 25,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#000',
    color: '#000',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 14,
    color: '#000',
  },
  createButton: {
    backgroundColor: '#000', // Black
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
  },
  createButtonText: {
    color: '#FFF', // White
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#000',
  },
  loginText: {
    color: '#0000FF', // Blue
    fontWeight: 'bold',
  },
});

export default Signup