import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ImageBackground, TextInput, FlatList } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

import { addUserMessage, addBotMessage, Message } from '../components/ChatUtils';

//Snackbar
import Snackbar from 'react-native-snackbar'

//context API
import {AppwriteContext} from '../appwrite/AppwriteContext'

import { DrawerParamList } from '../routes/AppStack2';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type UserObj = {
  name: String;
  email: String;
}

type HomeScreenProps = {
  navigation: DrawerNavigationProp<DrawerParamList, 'Home'>;
};

const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [userData, setUserData] = useState<UserObj>()
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext)
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleLogout = () => {
    appwrite.logout()
    .then(() => {
      setIsLoggedIn(false);
      Snackbar.show({
        text: 'Logout Successful',
        duration: Snackbar.LENGTH_SHORT
      })
    })
  }


// Example of adding messages
const handleSend = (input: string, setMessages: React.Dispatch<React.SetStateAction<Message[]>>) => {
  addUserMessage(input, setMessages);                // Add user's message to the chat
  setTimeout(() => {
    addBotMessage(`Echo: ${input}`, setMessages);    // Simulate a bot response with a delay
  }, 500);
};


  useEffect(() => {
    appwrite.getCurrentUser()
    .then(response => {
      if (response) {
        const user: UserObj = {
          name: response.name,
          email: response.email
        }
        setUserData(user)
      }
    })
  }, [appwrite])
  
    // Render each chat message
    const renderItem = ({ item }: { item: Message }) => (
      <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.botBubble]}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
 
  return (
    <View style={styles.container}>
      <View style={styles.headerIcons}>
        <TouchableOpacity>
          <Icon name="comment-o" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="user-circle-o" size={35} color="black" 
          onPress={() => navigation.toggleDrawer()}/>
        </TouchableOpacity>
      </View>

      <ImageBackground
        source={require('../../assets/logo.png')} // Replace with your local image path
        style={styles.logo}
      />

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.botBubble]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        style={styles.messageList}
        contentContainerStyle={styles.chatContainer}
      />

    <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={text=>setInput(text)}
          style={[styles.input]}
          placeholder="Ask Nyaayveer"
          placeholderTextColor="#000"
          onSubmitEditing={() => handleSend(input, setMessages)}
        />
        {!input && <>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="camera" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="microphone" size={25} color="black" />
          </TouchableOpacity>
        </>}

        {input && 
          <TouchableOpacity style={styles.sendButton}
            onPress={() => handleSend(input, setMessages)}>
            <Icon name="arrow-right" size={25} color="#fff" />
          </TouchableOpacity>
        }
      </View>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
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
    position: 'absolute',
    elevation: -1,

  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    borderRadius: 50,
    paddingHorizontal: 10,
    width: '90%',
    height: 60,
    marginBottom: 50,
    marginTop: 10,
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  messageBubble: {
    padding: 12,
    marginVertical: 4,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#FFD700',
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#E0E0E0',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  messageList: {
    elevation: 9,
    width: '90%',
  }
});

export default Home