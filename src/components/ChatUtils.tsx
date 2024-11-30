
export interface Message {
  id: number;
  text: string;
  uri: string;
  type: 'image' | 'audio' | 'text';
  sender: 'user' | 'bot';
}

export const addUserMessage = (
  message: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  const newMessage: Message = {
    id: Date.now(), 
    uri: '',
    text: message,  
    sender: 'user',
    type: 'text',
  };

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


  setMessages((prevMessages) => [...prevMessages, replyMessage]);
};


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

