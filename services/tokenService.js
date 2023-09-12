const jwt = require('jsonwebtoken');

const SECRET_KEY = '';

function generateJWT(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

function verifyJWT(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        console.error('Invalid token: ', error);
        return null;
    }
};

module.exports = {
    generateJWT, 
    verifyJWT
}