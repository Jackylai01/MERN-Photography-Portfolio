const Joi = require("joi");

//註冊驗證
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required().label("使用者姓名"),
    email: Joi.string().min(6).max(50).required().email().label("信箱"),
    password: Joi.string()
      .min(6)
      .max(255)
      .regex(/[a-zA-Z0-9]{6,30}$/)
      .required(),
    role: Joi.string().label("管理者"),
  });
  return schema.validate(data);
};
//登入驗證
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(8).max(50).required().email().label("信箱"),
    password: Joi.string().min(8).max(255).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
