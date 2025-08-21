
export default {
  baseURL: 'https://bookstore.demoqa.com',
endpoints: {
    auth: '/Account/v1/Authorized',
    createUser: '/Account/v1/User',
    getUser: '/Account/v1/User',
    books: {
      create: '/api/v1/books',        // Создание книги
      update: '/api/v1/books/:isbn',  // Обновление книги
      get: '/api/v1/books/:isbn',     // Получение книги
      delete: '/api/v1/books/:isbn'   // Удаление книги
    }
  }
};