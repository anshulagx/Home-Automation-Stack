const express = require('express')

const profile = require('./routes/api/profile')


const bodyParser = require('body-parser');

const app = express()

app.use(express.json())

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/control", profile)

//For all unmatched routes
app.use((req, res) => {
    res.status(400).json("Invalid API request");
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server started on port ${port}`))
