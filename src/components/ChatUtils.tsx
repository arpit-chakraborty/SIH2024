// chatUtils.tsx

// Define the structure of a chat message
export interface Message {
  id: number;
  text: string;
  uri: string;
  type: 'image' | 'audio' | 'text';
  sender: 'user' | 'bot';
}

// Function to handle adding user messages to the chat
export const addUserMessage = (
  message: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  const newMessage: Message = {
    id: Date.now(), 
    uri: '',            // Unique ID based on the current timestamp
    text: message,  
    sender: 'user',            // Indicates that this message is from the user
    type: 'text',
  };

  // Update the chat state by appending the new user message
  setMessages((prevMessages) => [...prevMessages, newMessage]);
};

// Function to handle adding bot messages to the chat
export const addBotMessage = (
  reply: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  const replyMessage: Message = {
    id: Date.now() + 1,
    uri: '',
    text: reply,               // Message content from the bot
    sender: 'bot',             // Indicates that this message is from the bot
    type: 'text',
  };

  // Update the chat state by appending the new bot message
  setMessages((prevMessages) => [...prevMessages, replyMessage]);
};

// Function to handle adding media messages (image or audio) to the chat
export const addMediaMessage = (
  uri: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  type: 'image' | 'audio'
) => {
  const newMessage: Message = {
    id: Date.now(),
    uri: uri,
    text: '',
    sender: 'user',
    type: type,
  };

  setMessages((prevMessages) => [...prevMessages, newMessage]);
};

