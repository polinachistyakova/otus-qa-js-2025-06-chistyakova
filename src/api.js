const baseUrl = 'https://reqres.in/api'

;(async () => {
  try {
    const response = await fetch(`${baseUrl}/users`)
    const data = await response.json()
    console.log('status', response.status)
    console.log('data', data)
  } catch (error) {
    console.error('Не получилось получить список юзеров', error)
  }
})()
