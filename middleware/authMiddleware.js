const jwt = require('jsonwebtoken');
const { isTokenBlacklisted, addToBlacklist } = require('../config/redisdb')

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            status: 401, 
            message: 'Unauthorized: No or invalid token format provided', 
            error: null 
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Check if the token is blacklisted
        if (await isTokenBlacklisted(token)) {
            return res.status(403).json({ 
                status: 403, 
                message: 'Token is blacklisted and cannot be used', 
                error: null 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log('User decoded from token:', req.user);
        next();
    } catch (error) {
        return res.status(401).json({ 
            status: 401, 
            message: 'Unauthorized: Invalid token', 
            error: error.message 
        });
    }
};


const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        console.log('User role:', req.user.role);  
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ 
                status: 403, 
                message: 'Access denied: Insufficient permissions', 
                error: null 
            });
        }
        next();
    };
};

module.exports = { authMiddleware, roleMiddleware };
