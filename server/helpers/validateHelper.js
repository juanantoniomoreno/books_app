const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    try {
        console.log(req.body);
        
        validationResult(req.body).throw()
        return next()
    } catch (err) {
        res.status(403)
        res.send({ errors: err.array() })
        console.log( {errors: err.array() } );
        
    }
}

module.exports = { validateResult }