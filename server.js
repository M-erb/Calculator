// Get env variables
require('dotenv').config({
  path: './.env'
})

const path = require('path')
const express = require('express')
const app = express()
const helmet = require('helmet')

// Setup express
app.use(helmet())
app.use('/', express.static(path.join(__dirname, '/public')))

app.get('/', (req, res, next) => {
  res.sendFile('./public/index.html');
})


// 404 catch all for undefined routes
// app.get('/*', (req, res) => {
//   res.status(404).render('404', { path: req.path })
// })

// Start server
const port = process.env.PORT
app.listen(port, serverStarted)

function serverStarted() {
  let serverPort = this.address().port
  process.env.PORT = serverPort
  console.log(`Server Started, listening on port ${serverPort}`)
  console.log(`visit: http://localhost:${serverPort}`)
  // to display local network address to test on other devices
  require('./logip')(serverPort)
}
