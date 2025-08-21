import axios from 'axios';
import config from '../config/configApi';

class BookService {
  constructor(authToken) {
    this.client = axios.create({
      baseURL: config.baseURL,
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      validateStatus: function (status) {
        return status < 500;
      }
    });
  }

  async createBook(bookData) {
    try {
      const response = await this.client.post(config.endpoints.books.create, bookData);
      return {
        statusCode: response.status,
        ...response.data
      };
    } catch (error) {
      console.error('Ошибка при создании книги:', error);
      if (error.response) {
        console.log('Статус ошибки:', error.response.status);
        console.log('Тело ответа:', error.response.data);
      }
      throw error;
    }
  }

  async updateBook(isbn, bookData) {
    try {
      const response = await this.client.put(`${config.endpoints.books.update.replace(':isbn', isbn)}`, bookData);
      return {
        statusCode: response.status,
        ...response.data
      };
    } catch (error) {
      console.error('Ошибка при обновлении книги:', error);
      throw error;
    }
  }

  async getBook(isbn) {
    try {
      const response = await this.client.get(`${config.endpoints.books.get.replace(':isbn', isbn)}`);
      return {
        statusCode: response.status,
        ...response.data
      };
    } catch (error) {
      console.error('Ошибка при получении книги:', error);
      throw error;
    }
  }

  async deleteBook(isbn) {
    try {
      const response = await this.client.delete(`${config.endpoints.books.delete.replace(':isbn', isbn)}`);
      return {
        statusCode: response.status,
        message: response.data.message || 'Книга успешно удалена'
      };
    } catch (error) {
      console.error('Ошибка при удалении книги:', error);
      throw error;
    }
  }
}

export default BookService;
