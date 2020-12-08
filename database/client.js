const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connection successful, Madam!'))
    .catch(err => console.error(err.message))

const client = mongoose.connection

client.on('error', (err) => {
    console.error(err.message)
})

module.exports = client