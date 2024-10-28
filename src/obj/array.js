const teacher = {
  id: 10,
  name: 'Damir Rysaev',
  isActive: true,
  roles: ['teacher', 'mentor'],
  social: {
    x: 'https://twitter.com/user',
    vk: 'https://vk.com/user'
  }
}

const student = {
  id: 212,
  name: 'Jon Snow',
  isActive: true,
  roles: ['student'],
  social: {}
}

const badUser = {
  id: 343,
  name: 'My Bot',
  isActive: false
}

const users = [teacher, student, badUser]

console.log('users[2]', users[2]) // badUser
console.log('users[3]', users[3]) // undefined

console.log('users.at(2)', users.at(2)) // badUser
console.log('users.at(-1)', users.at(-1)) // also badUser

const userIds = users.map(user => {
  return user.id
})
console.log('userIds', userIds)

console.group('userIds')
userIds.forEach((userId, i) => {
  console.log(`i: ${i}; userId: ${userId}`)
})
console.groupEnd()

const isAllUserActive = users.every(user => {
  return user.isActive
})
console.log('isAllUserActive', isAllUserActive)

const isSomeUserActive = users.some(user => {
  return user.isActive
})
console.log('isSomeUserNotActive', isSomeUserActive)

const onlyActiveUsers = users.filter(user => {
  return user.isActive
})
console.log('onlyActiveUsers', onlyActiveUsers)

const foundBadUser = users.find(user => {
  return user.id === badUser.id
})
console.log('foundBadUser', foundBadUser)

const foundTeacher = users.find(user => {
  if (!Array.isArray(user.roles)) {
    return false
  }
  return user.roles.includes('teacher')
})
console.log('foundTeacher', foundTeacher)

const userNotFound = users.find(user => {
  if (!Array.isArray(user.roles)) {
    return false
  }
  return user.roles.includes('deleted role')
})
console.log('userNotFound', userNotFound)

console.log('const user of users')
for (const user of users) {
  console.log('user.name: ', user.name)
}
