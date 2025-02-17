const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const token=req.headers['authorization'];
    if (!token) {
        return res.status(403).send('Le token est obligatoire pour lauthentification');
    }
    jwt.verify(token,'alae_secret_key',(err, decoded)=>{
        if (err) {
            return res.status(401).send('Token invalid');
        }
        req.user = decoded;
        next();
    });
};
module.exports = verifyToken;