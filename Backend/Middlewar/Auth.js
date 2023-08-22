const jwt = require('jsonwebtoken');
const userdata = require('../Modle/user.moudle');

async function auth(req, res, next) {

    let token = req.headers.token;

    if (token) {
        try {

            if (token) {
                jwt.verify(token, "naren"); // throws error if invalid token
    
                const user = jwt.decode(token);
                const find=await userdata.findById(user.id)
                if(find){
                    req.user=user.id
                    next();
                }
                else {
                    res.status(400).send({
                        error: 'Invalid token provided'
                    })
                }
            }

        } catch (err) {
            return res.status(400).send({
                error: 'Invalid token provided'
            })
        }
    } else {
        return res.status(400).send({
            error: 'No token provided'
        })
    }
}

module.exports = auth;