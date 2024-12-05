import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useAppContext} from '../AppContext';
import { saveMessages } from '../service/backend';

interface InputPopupProps {
    visible: boolean;
    onClose: () => void;
  }

const NewCasePopup: React.FC<InputPopupProps> = ({visible, onClose}) => {
    const {caseNumber, setCaseNumber, victimName, setVictimName, setMessages, messages, userData} = useAppContext();


    const handleStart = async () => {
        await saveChatData();
        setMessages([]);
        onClose();
    };

    const saveChatData = async () => {
        if(userData && caseNumber && victimName){
            console.log('Saving chat data...');
            const uniqueId = `${userData?.unique_id}`;        
            await saveMessages(messages, uniqueId, victimName, caseNumber);
            setVictimName('');
            setCaseNumber('');
        }
    };

    return (
    <Modal
    transparent
    visible={visible}
    animationType="fade"
    onRequestClose={() => onClose()}>
    <View style={styles.modalOverlay}>
        <View style={styles.popupContainer}>
        {/* Header */}
        <Text style={styles.headerText}>New Case</Text>

        {/* Victim's Name Input */}
        <TextInput
            style={styles.input}
            placeholder="Victim's Name"
            placeholderTextColor="#666"
            value={victimName}
            onChangeText={setVictimName}
        />

        {/* Case Number Input */}
        <TextInput
            style={styles.input}
            placeholder="Case No."
            placeholderTextColor="#666"
            value={caseNumber}
            onChangeText={setCaseNumber}
            keyboardType="numeric"
        />

        {/* Start Button */}
        <TouchableOpacity style={styles.startButton} 
          onPress={handleStart}>
            <Text style={styles.startButtonText}>Register Case</Text>
        </TouchableOpacity>
        </View>
    </View>
    </Modal>

    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  openButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
  },
  openButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContainer: {
    width: 300,
    backgroundColor: '#ffd700',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  startButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default NewCasePopup;
