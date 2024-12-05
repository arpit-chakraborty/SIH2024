// apiService.ts
import axios from 'axios';
import { Message } from '../components/ChatUtils';

const API_URL = 'http://192.168.29.225:3000/api/data';
const API_URL_RESPONSE = 'http://192.168.29.225:3000/api/response';

// Function to save messages to the backend
export const saveMessages = async (messages: any[], uniqueId: string, victimName: string, caseNumber: string) => {
  let d = new Date();
  const dateString = d.toDateString();
  try {
    const data = { "unique_id": uniqueId, "messages": messages, "date": dateString, "name": victimName, "caseNumber": caseNumber };
    console.log(data);
    await axios.post(`${API_URL}/saveData`, { data });
  } catch (error) {
    console.error('Error saving messages:', error);
    throw error;
  }
};

// Function to fetch messages from the backend
export const fetchMessages = async (uniqueId: string|undefined, caseNumber: string) => {
  try {
    const response = await axios.get(`${API_URL}/getData/messages`, {
      params: {
        unique_id: uniqueId,
        caseNumber: caseNumber,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

// Function to fetch dates from the backend
export const fetchCases = async (uniqueId: string|undefined) => {
  try {
    const response = await axios.get(`${API_URL}/cases`, {
      params: {
        unique_id: uniqueId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching dates:', error);
    throw error;
  }
};

export const fetchResponse = async (message: Message | undefined) => {
  try {
    const data = message;
    const response = await axios.post(`${API_URL_RESPONSE}/getResponse`, { data });
    return response.data;
  } catch (error) {
    console.error('Error fetching response:', error);
    throw error;
  }
}