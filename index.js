const server = require('./api/server')

require('dotenv').config()
const path = require('path')

const port = process.env.PORT || 3000

server.get('/', (req, res) => {
    res.send(`<h1>HELLO THERE</h1>`)
})

server.listen(port, () => {
    console.log(`listening on ${port}`)
})
