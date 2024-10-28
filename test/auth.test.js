import { config as _config } from '../framework'
import axios from 'axios'

const config = _config.dummyjson

describe('Auth', () => {
  it('Success login', async () => {
    const response = await axios.post(`${config.baseURL}/auth/login`, {
      username: config.username,
      password: config.password
    })
    expect(response.status).toEqual(200)
    expect(response.data.username).toBe(config.username)
    expect(response.data.accessToken).toBeTruthy()
  })

  it('Failed login', async () => {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: config.username,
        password: 'wrong_password',
        expiresInMins: 30
      })
    })
    const data = await response.json()

    expect(response.status).toEqual(400)
    expect(data.message).toBe('Invalid credentials')
  })
})
