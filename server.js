const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const credentials = require('./middleware/credentials')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const PORT = process.env.PORT || 4000

// custom middleware logger
app.use(logger)

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials)

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json())

// routes
app.use('/', require('./routes/root'))

//Swagger API Doc
const file = './api.yaml'
const swaggerJSDoc = YAML.load(file)
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc))

// app.all('*', (req, res) => {
//     res.status(404);
//     if (req.accepts('html')) {
//         res.sendFile(path.join(__dirname, 'views', '404.html'));
//     } else if (req.accepts('json')) {
//         res.json({ "error": "404 Not Found" });
//     } else {
//         res.type('txt').send("404 Not Found");
//     }
// });

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
