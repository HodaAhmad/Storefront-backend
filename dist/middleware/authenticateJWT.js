"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Create token Validator middleware
var authenticateToken = function (req, res, next) {
    try {
        var authorizeHeader = req.headers.authorization;
        if (!authorizeHeader) {
            throw new Error('No token');
        }
        var token = authorizeHeader.split(' ')[1];
        jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401);
        res.json('invalid token');
    }
};
exports["default"] = authenticateToken;
