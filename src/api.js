const baseUrl = 'https://reqres.in/api'

// eslint-disable-next-line no-unused-vars
async function fetchUsers() {
  const response = await fetch(`${baseUrl}/users`)
  return {
    status: response.status,
    headers: response.headers,
    data: await response.json()
  }
}

async function fetchUser(id) {
  const response = await fetch(`${baseUrl}/users/${id}`)
  return {
    status: response.status,
    headers: response.headers,
    data: await response.json()
  }
}

;(async () => {
  try {
    const response = await fetchUser(2)
    console.log('status', response.status)
    console.log('data', response.data)
  } catch (error) {
    console.error('Не получилось выполнить запрос', error)
  }
})()
