import UserService from '../framework/services/UserService';

describe('User API Tests', () => {
  let testUserId;
  let authToken;

  // Тестовые данные
  const userData = {
    userName: `testuser_${Date.now()}`,  // Исправлены кавычки
    password: 'P@ssw0rd123!'
  };

  beforeAll(async () => {
    // Создаем пользователя перед тестами
    const createResponse = await UserService.createUser(userData);
    testUserId = createResponse.userID;

    // Генерируем токен сразу для всех тестов
    const tokenData = await UserService.generateToken(userData);
    authToken = tokenData.token;
  });

  afterAll(async () => {
    // Удаляем тестового пользователя после всех тестов
    if (testUserId && authToken) {
      await UserService.deleteUser(testUserId, authToken);
    }
  });

  it('Должен возвращать корректный токен', () => {
    expect(authToken).toBeTruthy();
    expect(typeof authToken).toBe('string');
  });

  it('Должен успешно авторизовать пользователя', async () => {
    const authResult = await UserService.authorize({
      userName: userData.userName,
      password: userData.password
    });

    console.log('Auth result:', authResult);

    // Проверяем, что авторизация успешна (возвращает true)
    expect(authResult).toBe(true);

    // ИЛИ, если сервер возвращает объект с другим полем:
    // expect(authResult.isAuthenticated).toBe(true);
  });

  it('Должен получать данные пользователя по ID', async () => {
    const userInfo = await UserService.getUser(testUserId, authToken);

    expect(userInfo).toBeTruthy();
    expect(userInfo.userId).toBe(testUserId);
    expect(userInfo.username).toBe(userData.userName);
  });
});