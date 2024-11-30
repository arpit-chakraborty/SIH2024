// apiService.ts
import axios from 'axios';

const API_URL = 'http://192.168.29.225:3000';


// Function to save messages to the backend
export const saveMessages = async (messages: any[], uniqueId: string) => {
  let d = new Date();
  const dateString = d.toDateString();
  try {
    const data = { "uniqueId": uniqueId, "messages": messages, "date": dateString };
    const response = await axios.post(`${API_URL}/saveMessages`, { data });
    return response.data;
  } catch (error) {
    console.error('Error saving messages:', error);
    throw error;
  }
};