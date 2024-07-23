const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    // extract the jwt token from the request header
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {

        // verify the jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to request object
        req.user = decoded
        next();


    } catch (error) {
        res.status(401).json({ error: 'Invalid Token' });

    }
}

// function to generate jwt token
const generateToken = (userData) => {
    // generate a new jwt token using user data
    return jwt.sign(userData, process.env.JWT_SECRET);
}

module.exports = { jwtAuthMiddleware, generateToken };