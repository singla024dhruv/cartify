//this is the auth middleware

/* this will act like a id card for the user who send the request
every time they make a request to protected routes they must be 
authorised to do so*/

const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    // it grabs the authorization header from the incoming HTTP request
    //Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    //now it is  authHeader: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    const token = authHeader && authHeader.split(' ')[1];
    /*First, it checks if authHeader exists (i.e., the user actually sent a token).
    If it exists, it splits the string by a space:
    Then, it takes the second part (index [1]), which is your actual JWT token:
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    if authHeader does not exit token==undefined
    */
    if (!token) {
        console.log(token);
        return res.status(401).json({ message: 'Access Denied' });

    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        console.log('JWT error:', err);
        return res.status(403).json({ message: 'Invalid token' });
    }

};
module.exports = verifyToken;