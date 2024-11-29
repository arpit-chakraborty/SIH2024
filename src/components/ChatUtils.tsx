// chatUtils.tsx

// Define the structure of a chat message
export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

// Function to handle adding user messages to the chat
export const addUserMessage = (
  message: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  const newMessage: Message = {
    id: Date.now(),            // Unique ID based on the current timestamp
    text: message,             // Message content from the user
    sender: 'user',            // Indicates that this message is from the user
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
    id: Date.now() + 1,        // Unique ID for the bot message (slightly different to avoid conflicts)
    text: reply,               // Message content from the bot
    sender: 'bot',             // Indicates that this message is from the bot
  };

  // Update the chat state by appending the new bot message
  setMessages((prevMessages) => [...prevMessages, replyMessage]);
};
