// import { Request, Response, NextFunction } from "express";

// Middleware to extract the token from headers
const extractToken = (req, res, next) => {
    const authorization = req.headers.authorization;

    console.log("code......", authorization, "token....", req.headers)

    // Check if the Authorization header exists and starts with "Bearer "
    if (authorization && authorization.startsWith("Bearer ")) {
        const token = authorization.split(" ")[1]; // Extract the token (second part)
        req.headers.token = token; // Attach the token to the request headers
        return next(); // Pass control to the next middleware or route handler
    }

    // Return an error if no valid token is found
    return res.status(401).json({ error: "Authorization token missing or invalid" });
};

// export default extractToken;

module.exports = extractToken
