import 'dotenv/config'

export default Object.freeze({
  baseURL: process.env.TEST_DUMMYJSON_API_URL ?? 'https://dummyjson.com',
  username: process.env.TEST_DUMMYJSON_USERNAME,
  password: process.env.TEST_DUMMYJSON_PASSWORD
})
