const mongoose = require('mongoose');

const { database } = require('./keys');

mongoose.connect(database.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    //useFindAndModify: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));