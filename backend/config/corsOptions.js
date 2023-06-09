const allowedOrigins = require('./allowetOrigins')

const corsOptions = {
  origin: (origin, callback) => {
    // Check given requested origin name is in our allowedOrigins array
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccesStatus: 200,
}

module.exports = corsOptions
