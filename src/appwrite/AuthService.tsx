// AuthService.ts
import axios from 'axios';

const API_URL = 'https://p8z4c9rg-3000.inc1.devtunnels.ms/api/auth';

type LoginPayload = {
  id: string;
  password: string;
};

type SignupPayload = {
  id: string;
  password: string;
  name: string;
  mobileNo: string;
  policeStaitionId: string;
};

class AuthService {
  // Login function
  static async login({ id, password }: LoginPayload) {
    try {
      const response = await axios.post(`${API_URL}/login`, { id, password });
      return response.data; // Assuming the token is returned in response.data
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Signup function
  static async signup({ id, password, name, mobileNo, policeStaitionId }: SignupPayload) {
    try {
      console.log({ id, password, name, mobileNo, policeStaitionId });
      const response = await axios.post(`${API_URL}/signup`, { id, password, name, mobileNo, policeStaitionId });
      return response.data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  static async getUserDetails(token: string) {
    try {
      const response = await axios.get(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the Authorization header
        },
      });
      return response.data.user; // Assuming the response contains user details
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error; // Propagate the error for handling in the calling function
    }
  }

}

export default AuthService;
