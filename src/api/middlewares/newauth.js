// const { Error_Hander } = require('../../utils/newErrorhandler');
// const {ErrorHander} = require('../../utils/error-handler');
const {Errors} = require('../../utils/app-errors');
const jwt = require('jsonwebtoken');
const {AttendanceModel} = require("../../database/models");






exports.isAuthenticatedUser =  async(req,res,next)=>{
    //just getting token value without json object
    const {token} = req.cookies;
    // console.log(token);
    
    if(!token){
        return next(new Errors("Please login to access this resource",401));
    }

    //if have  token then 
    const decodedData = jwt.verify(token, process.env.APP_SECRET);
    console.log(decodedData);

    //id is that which we created when creating jwt token
   req.user =  await AttendanceModel.findOne({employeeId:decodedData._id});
//    console.log(req.user);

   if(!req.user){
    return next(new Errors("You dont have data in attendance model req.user not set",401));
   }
    console.log(req.user);
    next();

};

exports.authorizeRoles = (...roles)=>{
    
    return (req,res,next)=>{
        const {token} = req.cookies;
        if(!token){
            return next(new Errors("Please login to access this resource",401));
        }
        const decodedData = jwt.verify(token, process.env.APP_SECRET);

        console.log(decodedData.role);
        if(!roles.includes(decodedData.role)){
           return next(new Errors("You are not admin",403));
        }
        next();
    };
};