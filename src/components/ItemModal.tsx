import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import  AudioRecorderPlayer  from "react-native-audio-recorder-player";
import Icon from "react-native-vector-icons/MaterialIcons";

import { fetchMessages } from "../service/backend";
import { Message } from '../components/ChatUtils';

import { useAppContext } from "../AppContext";
import { FlatList } from "react-native-gesture-handler";
import { Image } from "@rneui/themed";

import Loading from "./Loading";

interface ItemModalProps {
  visible: boolean;
  onClose: () => void;
  itemName: string;
}

const audioRecorderPlayer = new AudioRecorderPlayer();

const ItemModal: React.FC<ItemModalProps> = ({ visible, onClose, itemName }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { userData } = useAppContext();

    const caseNo = itemName.split(":")[0];


    useEffect(() => {
        if (visible) {
            console.log(userData?.unique_id, caseNo);
            getMessages();
        }
    }, [visible]);

    if(!messages){
        return (
            <Modal transparent visible={visible} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                <Icon name="close" size={25} color="#000" />
                            </TouchableOpacity>
                        </View>
                        <ImageBackground
                            source={require('../../assets/logo.png')}
                            style={styles.logo}
                        />
                        <Loading />
                    </View>
                </View>
            </Modal>
        )
    }

    const getMessages = async () => {
        console.log(userData?.unique_id, caseNo);
        const response = await fetchMessages(userData?.unique_id, caseNo);
        setMessages(response);
        setIsLoading(false);
    }


    const handleImagePress = (uri: string) => {
        setSelectedImage(uri);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
      };

    const renderItem = ({item}: {item: Message}) => (
        <View
          style={[
            styles.messageBubble,
            item.sender === 'user' ? styles.userBubble : styles.botBubble,
          ]}>
          {item.type === 'text' && (
            <Text style={styles.messageText}>{item.text}</Text>
          )}
          {item.type === 'image' && (
            <TouchableOpacity onPress={() => handleImagePress(item.uri)}>
              <Image source={{uri: item.uri}} style={styles.mediaImage} />
            </TouchableOpacity>
          )}
          {item.type === 'audio' && (
            <TouchableOpacity
              onPress={() => audioRecorderPlayer.startPlayer(item.uri)}>
              <Icon name="play-circle" size={30} color="black" />
            </TouchableOpacity>
          )}
        </View>);
        
    return (
        <Modal transparent visible={visible} animationType="fade">
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.closeButton} onPress={()=> {
                        setMessages([]);
                        onClose();
                    }}>
                        <Icon name="close" size={25} color="#000" />
                    </TouchableOpacity>
                </View>
                <ImageBackground
                    source={require('../../assets/logo.png')} // Replace with your local image path
                    style={styles.logo}
                />
                <FlatList
                    data={messages}
                    keyExtractor={item => item.id.toString()}
                    renderItem={item => renderItem(item)}
                    style={styles.messageList}
                    contentContainerStyle={styles.chatContainer}
                />
                <Modal visible={!!selectedImage} transparent={true} animationType="fade">
                    <View style={styles.modalContainer}>
                    <TouchableOpacity
                        style={styles.closeButtonImage}
                        onPress={closeImageModal}>
                        <Icon name="close" size={30} color="#fff" />
                    </TouchableOpacity>
                    <Text>{selectedImage? 'Image Selected' : 'No Image Selected'}</Text>
                    <Image
                        source={
                        selectedImage
                            ? {uri: selectedImage}
                            : require('../../assets/logo.png')
                        }
                        style={styles.fullImage}
                    />
                    </View>
                </Modal>
            </View>
        </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: "95%",
    height: "95%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    elevation: 5,
  },
  header: {
    width: "100%",
    height: '3%',
    flexDirection: "row",
  },
  closeButton: {
    top: 5,
    right: 7,
    position: "absolute",
    marginTop: 0,
    fontSize: 20,
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
    elevation: 5,
    width: '90%',
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  mediaImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonImage: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  fullImage: {
    width: '70%',
    height: '60%',
    resizeMode: 'contain',
  },
});

export default ItemModal;
