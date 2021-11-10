const jwt = require('jsonwebtoken');
const SECRET_KEY = "Something very complicated @##@!"

const fetchuser = (req, res, next) => {
    // Get user info using jwt token
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).json({ "msg": "Please Authenticate with a correct token." });
    }
    try {
        const data = jwt.verify(token, SECRET_KEY);
        req.user = data.user;    
        next();
    }
    catch (error) {
        console.error(error.message)
        return res.status(401).json({ "msg": "Please Authenticate with a correct token." });
    }
}

module.exports = fetchuser;