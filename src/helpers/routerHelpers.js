const Joi = require("joi");

const validateBody = (schema) => {
    return (req, res, next) => {
        const validatorResult = schema.validate(req.body);
        if (validatorResult.error) return res.status(400).json(validatorResult.error);
        else{
            if (!req.value) req.value = {};
            if (!req.value.body) req.value.body = {};
            req.value.body = validatorResult.value;
            next();
        }
    }
}

const validateParam = (schema, name) =>{
    return (req, res, next) => {
        const validatorResult = schema.validate({param: req.params[name]})
        if (validatorResult.error){
            return res.status(400).json(validatorResult.error)
        }else{
            if (!req.value) req.value = {};
            if (!req.value['params']) req.value.params = {};
            req.value.params[name] = validatorResult.value.param;
            next();
        }
    }
}

const schema = {
    idSchema: Joi.object().keys({
        param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    }),

    authSignInSchema: Joi.object().keys({
        email: Joi.string().min(10).required(),
        password: Joi.string().min(6).required(),
    }),

    authSignUpSchema: Joi.object().keys({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().min(10).required(),
        password: Joi.string().min(6).required(),
    }),

    deckSchema: Joi.object().keys({
        name: Joi.string().min(2).required(),
        description: Joi.string().min(2),
    }),

    newDeckSchema: Joi.object().keys({
        name: Joi.string().min(2).required(),
        description: Joi.string().min(2),
        owner: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    }),

    newDeckSchemaOptional: Joi.object().keys({
        name: Joi.string().min(2),
        description: Joi.string().min(2),
        owner: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    }),

    userSchema: Joi.object().keys({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().min(2).required()
    }),
    userOptionalSchema: Joi.object().keys({
        firstName: Joi.string().min(2),
        lastName: Joi.string().min(2),
        email: Joi.string().min(2)
    })
}


module.exports = {
    validateBody,
    validateParam,
    schema
};