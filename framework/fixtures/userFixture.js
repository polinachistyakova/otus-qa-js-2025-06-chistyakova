import { faker } from '@faker-js/faker'

export function generateUserCredentials() {
  return {
    username: faker.internet.email(),
    password: 'P@ssw0rd'
  }
}
