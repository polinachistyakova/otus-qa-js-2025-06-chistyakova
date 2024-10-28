const config = {
  baseURL: process.env.TEST_DUMMYJSON_API_URL,
  username: process.env.TEST_DUMMYJSON_USERNAME,
  password: process.env.TEST_DUMMYJSON_PASSWORD
}

describe('Auth', () => {
  it('Success login', async () => {
    const response = await fetch(`${config.baseURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: config.username,
        password: config.password,
        expiresInMins: 30
      })
    })
    const data = await response.json()

    expect(response.status).toEqual(200)
    expect(data.username).toBe(config.username)
    expect(data.accessToken).toBeTruthy()
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
