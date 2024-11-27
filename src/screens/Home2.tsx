import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerIcons}>
        <TouchableOpacity>
          <Icon name="comment-o" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="user-circle-o" size={35} color="black" />
        </TouchableOpacity>
      </View>

      <Image
        source={require('../../assets/logo.png')} // Replace with your local image path
        style={styles.logo}
      />

    <View style={styles.bottomContainer}>
    <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask Nyaayveer"
          placeholderTextColor="#000"
        />
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="camera" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="microphone" size={25} color="black" />
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  headerIcons: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    opacity: 30,
    marginTop: '40%',
    marginBottom: '50%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 10,
    width: '90%',
    height: 60,
    marginBottom: 50,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },
  iconButton: {
    marginHorizontal: 5,
    padding: 10,
  },
  sendButton: {
    backgroundColor: '#00C853',
    borderRadius: 25,
    padding: 10,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'yellow',
    width: '100%',
    height: '30%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

export default HomeScreen;
