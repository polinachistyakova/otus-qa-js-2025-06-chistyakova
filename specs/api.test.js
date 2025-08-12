import UserService from '../framework/services/UserService';

describe('User API Tests', () => {
  let testUserId;
  let authToken;


  const userData = {
    userName: `testuser_${Date.now()}`,  
    password: 'P@ssw0rd123!'
  };

  beforeAll(async () => {

    const createResponse = await UserService.createUser(userData);
    testUserId = createResponse.userID;
    const tokenData = await UserService.generateToken(userData);
    authToken = tokenData.token;
  });

  afterAll(async () => {
  
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
    expect(authResult).toBe(true);

 
  });


  it('Должен получать данные пользователя по ID', async () => {
    const userInfo = await UserService.getUser(testUserId, authToken);

    expect(userInfo).toBeTruthy();
    expect(userInfo.userId).toBe(testUserId);
    expect(userInfo.username).toBe(userData.userName);
  });
});