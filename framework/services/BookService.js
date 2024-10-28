import supertest from 'supertest'
import config from '../config/configBookstore'

const getBooks = async () => {
  const response = await supertest(config.baseURL).get('/BookStore/v1/Books')
  return {
    headers: response.headers,
    status: response.status,
    data: response.body
  }
}

export default {
  getAll: getBooks
}
