const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const client = require('./routes/client.router');
const connection = require('./db/connection');

const app = express();
const PORT = 4101;

/* connect to db */
connection();

/* middlewares */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

/* routes */
app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.use('/api',client);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})