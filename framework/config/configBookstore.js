import 'dotenv/config'

// Object.freeze используем, чтобы запретить изменять конфиг,
// конфиг только для чтения
export default Object.freeze({
  // если хотим задать значения по-умолчанию, можно использовать оператор ??
  baseURL: process.env.TEST_BOOKSTORE_API_URL ?? 'https://bookstore.demoqa.com',
  userId: process.env.TEST_BOOKSTORE_USER_ID,
  username: process.env.TEST_BOOKSTORE_USERNAME,
  password: process.env.TEST_BOOKSTORE_PASSWORD
})
