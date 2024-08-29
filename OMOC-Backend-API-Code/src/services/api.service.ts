import axios from 'axios';
import { logger } from '../utils';
import { Error } from 'mongoose';
class ApiService {
  searchLocation = async (key?: string) => {
    const options = {
      method: 'GET',
      url: 'https://map-places.p.rapidapi.com/textsearch/json',
      params: {
        radius: '1500',
        query: key,
        // keyword: 'cruise',
      },
      headers: {
        'X-RapidAPI-Key': '14fa0f809fmsh9db3265a5f4ccccp1cde24jsn828d59970567',
        'X-RapidAPI-Host': 'map-places.p.rapidapi.com',
      },
    };

    try {
      const { data } = await axios.request(options);
      return data?.results || [];
    } catch (error) {
      logger.error(`Error in Fetching Locations: ${(error as Error).message}`);
      return [];
    }
  };
}

export const apiService = new ApiService();
