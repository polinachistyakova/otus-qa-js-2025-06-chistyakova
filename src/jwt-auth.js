;(async () => {
  const responseLogin = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'emilys',
      password: 'emilyspass',
      expiresInMins: 30 // optional, defaults to 60
    })
  })

  const data = await responseLogin.json()
  const token = data.token
  console.group('Login')
  console.log('status', responseLogin.status)
  console.log('data', data)
  console.groupEnd()

  const responseMe = await fetch('https://dummyjson.com/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const dataMe = await responseMe.json()
  console.group('Me')
  console.log('status', responseMe.status)
  console.log('data', dataMe)
  console.groupEnd()
})()
