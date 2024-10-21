const baseUrl = 'https://reqres.in/api'

async function fetchUsers() {
  const response = await fetch(`${baseUrl}/users`)
  return {
    status: response.status,
    headers: response.headers,
    data: await response.json()
  }
}

;(async () => {
  try {
    const response = await fetchUsers()
    console.log('status', response.status)
    console.log('data', response.data)
  } catch (error) {
    console.error('Не получилось выполнить запрос', error)
  }
})()
