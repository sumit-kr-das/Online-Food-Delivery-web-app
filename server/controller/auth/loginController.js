import Joi from 'joi';
import { User, RefreshToken } from '../../models';
import CustomErrorHandler from '../../services/custiomErrorHandler';
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService';
import { REFRESH_SECRET } from '../../config';


const loginController = {
    async login(req,res,next){
        // validation 
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        });
        const { error } = loginSchema.validate(req.body);
        if(error){
            return next(error);
        }

        // if user is already exist
        let user;
        try{
            user = await User.findOne({ email: req.body.email });
            if(!user){
                return next(CustomErrorHandler.wrongCredentials());
            }

            // compare the password
            const match = await bcrypt.compare(req.body.password, user.password);
            if(!match){
                return next(CustomErrorHandler.wrongCredentials());
            }
        }catch(err){
            return next(err);
        }

        // Compare Token
        const access_token = JwtService.sign({ _id: user._id, role: user.role });
        const refresh_token = JwtService.sign({ _id: user._id, role: user.role }, '1y', REFRESH_SECRET );
        //database whitelist
        await RefreshToken.create({ token: refresh_token });

        res.json({ access_token: access_token, refresh_token: refresh_token });
    },
    async logout(req,res,next){
        // validation 
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required(),
        });
        const { error } = refreshSchema.validate(req.body);

        if (error) {
            return next(error);
        }
        //logout(delete) refresh token
        try{
            await RefreshToken.deleteOne({ token: req.body.refresh_token });
        }catch(err){
            return next(new Error("Something went wrong wrong in the database !"));
        }

        res.json({status: 1})
    }
}

export default loginController;