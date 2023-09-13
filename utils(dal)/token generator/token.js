const crypto = require('crypto');

function generateToken() {
    return crypto.randomBytes(20).toString('hex');
};

const secretKey = generateToken();
console.log(secretKey)

module.exports = { generateToken };
