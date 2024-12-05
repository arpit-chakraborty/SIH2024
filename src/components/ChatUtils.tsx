import { fetchResponse } from "../service/backend";


export interface Message {
  id: number;
  text: string;
  uri: string;
  type: 'image' | 'audio' | 'text';
  sender: 'user' | 'bot';
}

export const addUserMessage = async (
  message: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
) => {
  const newMessage: Message = {
    id: Date.now(), 
    uri: '',
    text: message,  
    sender: 'user',
    type: 'text',
  };
  // console.log("User: ",currentUserMessage);
  // setCurrentUserMessage(newMessage);
  // console.log("User: ",currentUserMessage);

  setMessages((prevMessages) => [...prevMessages, newMessage]);

  addBotMessage(setMessages, newMessage);
};

// Function to handle adding bot messages to the chat
export const addBotMessage = async (
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  message: Message
) => {

  const reply = await fetchResponse(message);


  const replyMessage: Message = {
    id: Date.now() + 1,
    uri: '',
    text: reply,
    sender: 'bot',
    type: 'text',
  };

  setMessages((prevMessages) => [...prevMessages, replyMessage]);
};


export const addMediaMessage = (
  uri: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  type: 'image' | 'audio',
) => {

  const newMessage: Message = {
    id: Date.now(),
    uri: uri,
    text: '',
    sender: 'user',
    type: type,
  };
  setMessages((prevMessages) => [...prevMessages, newMessage]);
  addBotMessage(setMessages, newMessage);
};

