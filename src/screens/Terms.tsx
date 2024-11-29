import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import { AuthStackParamList } from '../routes/AuthStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type TermsProps = {
  navigation: NativeStackScreenProps<AuthStackParamList, 'Terms'>['navigation'];
}

const Terms: React.FC<TermsProps> = ({navigation}) => {
  return (
    <View style= {styles.container}>
      <TouchableOpacity style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.text}>You can find our terms and conditions here</Text>
    </View>
  )
}

export default Terms

const styles = StyleSheet.create({
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
container: {
  flex: 1,
  backgroundColor: '#FFD700', // Bright yellow
  alignItems: 'center',
  padding: 10,
},
text: {
  paddingTop: 50,
  fontSize: 24,
  color: '#003366', // Blue
  fontWeight: 'bold',
},
})