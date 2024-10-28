import { config as _config, UserDummyService } from '../../framework'
import got from 'got'

const config = _config.dummyjson

/**
 * Чтобы got работал вместе с jest
 * нужно добавить в jest.config.js
 *   transformIgnorePatterns: [
 *     "/node_modules/(?!got)/"
 *   ]
 * DOC: https://jestjs.io/docs/configuration#transformignorepatterns-arraystring
 */

describe('Auth', () => {
  // beforeEach

  it('Success login', async () => {
    const response = await got.post(`${config.baseURL}/auth/login`, {
      json: {
        username: config.username,
        password: config.password,
        expiresInMins: 30
      },
      responseType: 'json'
    })
    expect(response.statusCode).toEqual(200)
    expect(response.body.username).toBe(config.username)
    expect(response.body.accessToken).toBeTruthy()
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

  it('me information', async () => {
    const responseToken = await UserDummyService.login({
      username: config.username,
      password: config.password
    })

    const responseMe = await UserDummyService.me({
      token: responseToken.data.accessToken
    })

    expect(responseToken.status).toEqual(200)
    expect(responseMe.status).toBe(200)
    expect(responseMe.data.email).toEqual('emily.johnson@x.dummyjson.com')
  })
})
