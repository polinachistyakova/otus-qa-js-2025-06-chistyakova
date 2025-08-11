import UserService from '../framework/services/UserService';

describe('User API Tests', () => {
  let testUserId;
  let authToken;

  // Тестовые данные
  const userData = {
    userName: `testuser_${Date.now()}`,
    password: 'P@ssw0rd123!'
  };

  beforeAll(async () => {
    // Создаем пользователя перед тестами
    const createResponse = await UserService.createUser(userData);
    testUserId = createResponse.userID;
  });

  afterAll(async () => {
    // Удаляем тестового пользователя после всех тестов
    if (testUserId && authToken) {
      await UserService.deleteUser(testUserId, authToken);
    }
  });

  it('Должен генерировать токен для пользователя', async () => {
    const tokenData = await UserService.generateToken(userData);

    console.log('Token response:', tokenData);

    expect(tokenData).toBeTruthy();
    expect(tokenData.token).toBeTruthy();
    expect(typeof tokenData.token).toBe('string');
    expect(tokenData.status).toBe('Success');

    // Сохраняем токен для последующих тестов
    authToken = tokenData.token;
  });

  it('Должен успешно авторизовать пользователя', async () => {
    const authData = await UserService.authorize({
      userName: userData.userName,
      password: userData.password
    });

    expect(authData).toBeTruthy();
  });

  it('Должен получать данные пользователя по ID', async () => {
    const userInfo = await UserService.getUser(testUserId, authToken);

    expect(userInfo).toBeTruthy();
    expect(userInfo.userId).toBe(testUserId);
    expect(userInfo.username).toBe(userData.userName);
  });

  it('Должен удалять пользователя по ID', async () => {
    // 1. Выполняем запрос на удаление
    const deleteResponse = await UserService.deleteUser(testUserId, authToken);

    // 2. Проверяем успешный статус (200 или 204)
    expect([200, 204]).toContain(deleteResponse.status);
  });
});