let nameField = 'name'
let socialField = 'social'

const teacher = {
  id: 1,
  [nameField]: 'Damir Rysaev',
  isActive: true,
  roles: ['teacher', 'mentor'],
  [socialField]: {
    x: 'https://twitter.com/user',
    vk: 'https://vk.com/user'
  }
}

nameField = 'user name'
socialField = 'social networks'

const student = {
  id: 2,
  [nameField]: 'Jon Snow',
  isActive: true,
  roles: ['student'],
  [socialField]: {}
}

console.log('teacher name: ', teacher.name)
console.log('student name: ', student[nameField])
