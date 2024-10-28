import config from '../config/configBookstore'

const generateToken = async ({ userName, password }) => {
  const response = await fetch(`${config.baseURL}/Account/v1/GenerateToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, password })
  })

  return {
    headers: response.headers,
    status: response.status,
    data: await response.json()
  }
}

const authorized = async ({ userName, password }) => {
  const response = await fetch(`${config.baseURL}/Account/v1/Authorized`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, password })
  })

  return {
    headers: response.headers,
    status: response.status,
    data: await response.json()
  }
}

const login = async ({ userName, password }) => {
  const response = await fetch(`${config.baseURL}/Account/v1/Login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, password })
  })

  return {
    headers: response.headers,
    status: response.status,
    data: await response.json()
  }
}

export default {
  generateToken,
  authorized,
  login
}
