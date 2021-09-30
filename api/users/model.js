const { nanoid } = require('nanoid')

function getId() {
    return nanoid().slice(0, 5)
}

const initializeUsers = () => ([
    { id: getId(), username: "Mabel", password: "treatLover" },
    { id: getId(), username: "Lala", password: "MabelLover"},
])

let users = initializeUsers()

const find = () => {
    // SELECT * FROM users;
    return Promise.resolve(users)
  }

const insert = ({ username, password }) => {
    // INSERT INTO users (name, bio) VALUES ('foo', 'bar');
    const newUser = { id: getId(), username, password }
    users.push(newUser)
    return Promise.resolve(newUser)
  }
  

module.exports = {
    find,
    insert,
}