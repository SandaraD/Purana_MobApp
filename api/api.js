import axios from 'axios';

const API_URL = 'http://192.168.1.22:4000/api';

export const getSiteDetails = (id) => {
    return axios.get(`${API_URL}/sites/${id}`);
};
