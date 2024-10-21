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

// eslint-disable-next-line no-unused-vars
async function fetchUser(id) {
  const response = await fetch(`${baseUrl}/users/${id}`)
  return {
    status: response.status,
    headers: response.headers,
    data: await response.json()
  }
}

// eslint-disable-next-line no-unused-vars
async function updateUser(id, data) {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return {
    status: response.status,
    headers: response.headers,
    data: await response.json()
  }
}

// eslint-disable-next-line no-unused-vars
async function putUser(id, data) {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return {
    status: response.status,
    headers: response.headers,
    data: await response.json()
  }
}

// eslint-disable-next-line no-unused-vars
async function deleteUser(id) {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: 'DELETE'
  })
  return {
    status: response.status,
    headers: response.headers
  }
}

async function createUser(data) {
  const response = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return {
    status: response.status,
    headers: response.headers,
    data: await response.json()
  }
}

;(async () => {
  try {
    const response = await createUser({
      name: 'Damir Rysaev',
      job: 'TechLead'
    })
    console.log('status', response.status)
    console.log('data', response.data)
  } catch (error) {
    console.error('Не получилось выполнить запрос', error)
  }
})()
