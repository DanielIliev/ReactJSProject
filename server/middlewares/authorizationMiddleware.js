const jwt = require('../lib/jsonwebtoken.js');
const { SECRET } = require('../constants.js');

const authorizedUser = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized operation'
        });
    }

    const JWT = token.split(' ')[1];

    try {
        const result = await jwt.verify(JWT, SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized operation'
                });
            }
            return decoded;
        });

        req.decoded = result;
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized operation'
        });
    }



    next();
}

module.exports = authorizedUser;