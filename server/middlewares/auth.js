import CustomErrorHandler from '../services/CustiomErrorHandler';
import JwtService from '../services/JwtService';

const auth = async (req,res,next) =>{
    let authHeader = req.headers.authorization;
    // console.log("authheader",authHeader);
    if(!authHeader){
        return next(CustomErrorHandler.unAuthorized());
    }

    // extract token
    const token = authHeader.split(' ')[1];
    // console.log("token",token);

    try{
        const { _id, role } = await JwtService.verify(token);
        const user = {
            _id,
            role
        };
        req.user = user;
        next();

    }catch(err){
        return next(CustomErrorHandler.unAuthorized());
    }
}

export default auth;