// * CHECKLIST
// ! [.] validate the request (joi)
// ! [ ] authorise the request
// ! [ ] check if user is in the database already
// ! [ ] prepare model
// ! [ ] store in database
// ! [ ] generate jwt token
// ! [ ] send response

import Joi from 'joi';
import CustomErrorHandler from '../../services/custiomErrorHandler';
import { User } from '../../models';
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService';

const registercontroller = {
  async register(req, res, next) {
    // validation
    const registerSchema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        repeat_password: Joi.ref('password')
    });


    // console.log(req.body); // enable json parser
    const { error } = registerSchema.validate(req.body);
    if(error){
        return next(error);
    }


    // if user is already exist
    try{
        const exist = await User.exists({ email: req.body.email });
        if(exist){
            //throw error in custion error handler
            return next(CustomErrorHandler.alreadyExist("This email is already exist")); 
        }
    }catch(err){
        return next(err);
    }


    // hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // prepare the model
    const user = new User ({ 
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    let access_token;
    try{
        const result = await user.save();

        //token
        access_token = JwtService.sign({ _id: result._id, role: result.role });

    }catch(err){
        return next(err);
    }

    res.json({ access_token: access_token });
  },
};

export default registercontroller;
