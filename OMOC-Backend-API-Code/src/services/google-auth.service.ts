import axios from 'axios';
export class GoogleAuth {
  verifyIdToken = async (token: string) => {
    const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
    return response?.data;
  };
}
export const googleAuth = new GoogleAuth();
