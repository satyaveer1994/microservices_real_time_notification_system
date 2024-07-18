const jwt = require("jsonwebtoken");
const User = require("../models/user");






const JWT_SECRET=process.env.JWT_SECRET

const protect = async function(req, res, next) {
    try {
        const token = req.headers.authorization;

        if (!token || !token.startsWith('Bearer ')) {
            return res.status(403).json({ status: false, message: 'Missing or invalid authentication token in request' });
        }

        const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
 
        if (!decoded) {
            return res.status(401).json({ status: false, message: 'Invalid authentication token' });
        }

        req.user = decoded; // Attach decoded token to request object
        next();
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

module.exports = protect;
