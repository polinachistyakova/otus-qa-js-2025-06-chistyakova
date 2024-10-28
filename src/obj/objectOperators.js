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

console.log('-----')

if ('name' in teacher) {
  console.log('Teacher has name: ', teacher.name)
}

console.log('delete teacher name')
delete teacher.name

if (!('name' in teacher)) {
  console.log("Teacher doesn't have name")
}

console.log('-----')

if (nameField in student) {
  console.log('Student has name: ', student[nameField])
}

console.log('delete student name')
delete student[nameField]

if (!('name' in student)) {
  console.log("Student doesn't have name")
}

console.log('-----')

console.group('Teacher fields')
for (const key in teacher) {
  console.log(`type ${key} is ${typeof teacher[key]}`)
  console.log(`value ${key} is`, teacher[key])
}
console.groupEnd()

console.group('Student fields')
for (const key in student) {
  console.log(`type ${key} is ${typeof student[key]}`)
  console.log(`value ${key} is`, student[key])
}
console.groupEnd()
