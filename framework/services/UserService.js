import axios from 'axios';
import config from '../config/configApi';

// Базовый клиент без авторизации
const baseClient = axios.create({
  baseURL: config.baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  validateStatus: function (status) {
    return status < 500; 
  }
});

// Функция для создания клиента с токеном
const createAuthenticatedClient = (token) => {
  return axios.create({
    baseURL: config.baseURL,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    validateStatus: function (status) {
      return status < 500;
    }
  });
};

export default {
  async createUser(userData) {
    const response = await baseClient.post('/Account/v1/User', userData);
    return this._handleResponse(response);
  },

  async generateToken(userData) {
    const response = await baseClient.post('/Account/v1/GenerateToken', userData);
    return this._handleResponse(response);
  },

async authorize(credentials) {
  const response = await baseClient.post('/Account/v1/Authorized', credentials);
  console.log('Raw auth response:', response.data); // Добавьте логирование
  return this._handleResponse(response);
},

  async getUser(userId, token) {
    const client = createAuthenticatedClient(token);
    const response = await client.get(`/Account/v1/User/${userId}`);
    return this._handleResponse(response);
  },

  async deleteUser(userId, token) {
    const client = createAuthenticatedClient(token);
    const response = await client.delete(`/Account/v1/User/${userId}`);
    return response;
  },

  _handleResponse(response) {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    
    const error = new Error(response.statusText || 'Request failed');
    error.response = response;
    throw error;
  }
};