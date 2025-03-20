const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
    // Check if Authorization header is present
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Access Denied! No token provided.",
            status: 401,
        });
    }

    // Extract token from header
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Access Denied! Invalid token format.",
            status: 401,
        });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                message: "Invalid token. Authentication failed.",
                status: 403,
            });
        }

        console.log("Verification successful:", decoded);
        req.user = decoded; // Store user info in request object
        console.log("verified token");
        next();
    });
};

module.exports = authMiddleware;
