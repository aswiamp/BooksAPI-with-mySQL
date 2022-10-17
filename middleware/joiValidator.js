const  CustomAPIError  = require("../errors/custom-error");
const joi = require("joi");

const  bookmany= (req, res, next) => {
  //create schema object
  const schema = joi.object({
    name: joi.string().required().min(2).max(25),
    imageurl: joi.string(),
    author: joi.string().required().min(4).max(25),
    pages: joi.number().min(50),
    price: joi.number().required().min(200),
  });
  //schema options
  const options = {
    abortEarly: false, //include all errors
  };
  //validate request body
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    throw new CustomAPIError(`validation error:${error.message}`);
  } else {
    req.body = value;
    next();
  }
};
module.exports = bookmany;
