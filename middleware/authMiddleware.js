const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ status: 401, message: 'Unauthorized: No or invalid token format provided', error: null });
    }

    const token = authHeader.split(' ')[1]; // Extract token after "Bearer"

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        console.log('User decoded from token:', req.user);  // Log decoded user
        next();
    } catch (error) {
        return res.status(401).json({ status: 401, message: 'Unauthorized: Invalid token', error: null });
    }
};

const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        console.log('User role:', req.user.role);  // Log role to check
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied: Insufficient permissions' });
        }
        next();
    };
};


module.exports = { authMiddleware, roleMiddleware };
