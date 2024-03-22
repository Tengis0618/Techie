import axios from 'axios';
const API_URL = '/api/user/';

const getProfile = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.get(API_URL + 'profile', config);

    return response.data;
}

const updateProfile = async (userData, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    
    const response = await axios.post(API_URL + 'update-profile', userData, config);

    return response.data;
}

const profileService = {
    getProfile,
    updateProfile,
}

export default profileService;