const jwt = require('jsonwebtoken')

//Verifies the user's JWT token from the request header.
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization

  //Checks if the Authorization header begins with "Bearer "
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  //Extracts the token from the Authorization header.
  const token = authHeader.split(' ')[1]

  //Verifies the token with the ACCESS_TOKEN_SECRET in the server.
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    //Returns a forbidden error if there is an issue with verifying the token.
    if (err) return res.status(403).json({ message: 'Forbidden' })
    //Sets the user and roles in the request object for further usage and calls the next middleware function.
    req.user = decoded.UserInfo.username
    req.roles = decoded.UserInfo.roles
    next()
  })
}

module.exports = verifyJWT
