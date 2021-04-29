const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');

const PORT = process.env.PORT || config.get('PORT');
const MONGO_DB_URL = process.env.MONGO_DB_URL || config.get('MONGO_DB_URL');

const concertRoute = require('./routes/concertRoute');
const postRoute = require('./routes/postRoute');
const songRoute = require('./routes/songRoute');

const app = express();

//
app.use(express.json());
app.use(cors())

// routing
app.use('/concert', concertRoute);
app.use('/post', postRoute);
app.use('/song', songRoute);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});

mongoose.connect(MONGO_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => {
        console.log(`Connected to MongoDB`);
    })
    .catch((err) => {
        console.log(`smth went wrong with the connection og Mongo: ${err}`);
    });