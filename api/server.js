let express = require('express')
let app = express()
let port = process.env.PORT || 38572
let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '1mb' }))

let routes = require('./routes/route')
routes(app)

app.listen(port)

console.log('RESTful API started on port: ' + port)
