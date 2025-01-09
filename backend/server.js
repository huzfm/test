const app = require('./app')
const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config({
      path: './.env'
})

const DB = process.env.DATABASE.replace(
      '<PASSWORD>',
      process.env.DATABASE_PASSWORD
)

mongoose.connect(DB).then(con => {
      console.log('DB connection sucessfull........')
})
      .catch((err) => {
            console.log(err.message)
      })

const port = 8000

const server = app.listen(port, () => {
      console.log('Listening from port 8000')
})