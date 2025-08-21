import BookService from '../framework/services/BookService';
import UserService from '../framework/services/UserService';
import assert from 'node:assert';

describe('Тесты API операций с книгами', () => {
    let testUserId;
    let authToken;
    let bookService;
    let createdBookISBN;
    let createdBook;

    const userData = {
        userName: `testuser_${Date.now()}`,
        password: 'P@ssw0rd123!'
    };

    beforeAll(async () => {
        const createResponse = await UserService.createUser(userData);
        testUserId = createResponse.userID;
        const tokenData = await UserService.generateToken(userData);
        authToken = tokenData.token;
        bookService = new BookService(authToken);
    });

    afterAll(async () => {
        if (testUserId && authToken) {
            await UserService.deleteUser(testUserId, authToken);
        }
    });

    it('Должен возвращать корректный токен', () => {
        assert.strictEqual(typeof authToken, 'string');
        assert.ok(authToken.length > 0);
    });

    it('Должен успешно авторизовать пользователя', async () => {
        const authResult = await UserService.authorize({
            userName: userData.userName,
            password: userData.password
        });
        console.log('Auth result:', authResult);
        assert.ok(authResult);
    });

    // Тест на создание книги
    it('Должен успешно создать книгу', async () => {
        const bookData = {
            userId: testUserId,
            collectionOfIsbns: [
                {
                    isbn: '978-3-16-148410-0'
                }
            ]
        };

        createdBook = await bookService.createBook(bookData);
        createdBookISBN = bookData.collectionOfIsbns[0].isbn;
        assert.strictEqual(createdBook.statusCode, 200);
    });

    it('Должен успешно обновить книгу', async () => {
        if (!createdBookISBN) {
            throw new Error('ISBN не был сохранен при создании книги');
        }

        const updateData = {
            userId: testUserId,
            collectionOfIsbns: [
                {
                    isbn: createdBookISBN
                }
            ],
            title: 'Обновленное название',
            author: 'Новый автор'
        };

        const response = await bookService.updateBook(createdBookISBN, updateData);
        assert.strictEqual(response.statusCode, 200);
    });
    it('Должен успешно получить книгу по ISBN', async () => {
        if (!createdBookISBN) {
            throw new Error('ISBN не был сохранен при создании книги');
        }

        const response = await bookService.getBook(createdBookISBN);

        assert.strictEqual(response.statusCode, 200);

    });
   it('Должен успешно удалить книгу', async () => {
        if (!createdBookISBN) {
            throw new Error('ISBN не был сохранен при создании книги');
        }
            const deleteResponse = await bookService.deleteBook(createdBookISBN);
            assert.strictEqual(deleteResponse.statusCode, 200);

            
   })
});
