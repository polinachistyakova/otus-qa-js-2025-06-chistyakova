import { clientDummyjson as client } from './client'
import config from '../config/configDummyjson'
import supertest from 'supertest'

const getUsers = async () => {
  const response = await client.get('/users')

  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  }
}

const login = async ({ username, password, expiresInMins }) => {
  const response = await fetch(`${config.baseURL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
      expiresInMins
    })
  })

  return {
    headers: response.headers,
    status: response.status,
    data: await response.json()
  }
}

const getMe = async ({ token }) => {
  const response = await supertest(config.baseURL).get('/user/me').set('Authorization', `Bearer ${token}`)

  return {
    headers: response.headers,
    status: response.status,
    data: response.body
  }
}

export default {
  getAll: getUsers,
  me: getMe,
  login
}

// fetch('https://dummyjson.com/users/1')
//   .then(res => res.json())
//   .then(console.log);
//
// fetch('https://dummyjson.com/users/search?q=John')
//   .then(res => res.json())
//   .then(console.log);
//
// fetch('https://dummyjson.com/users/filter?key=hair.color&value=Brown')
//   .then(res => res.json())
//   .then(console.log);
