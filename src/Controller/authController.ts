import { UserModel } from "../Models/User";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { Document } from "mongoose";
export const signup = async(req:any,res:any,next:any)=>{
    try{
    const {username,email,password} =req.body;
    if (!username || !email || !password) {
        return res.status(400).send({
          success: false,
          message: "Please Fill all fields",
        });
      }

      //existing user
      const exisitingUser = await UserModel.findOne({ email });
      if (exisitingUser) {
        return res.status(401).send({
          success: false,
          message: "user already exisits",
        });
}
const hashedPassword = await bcrypt.hash(password, 10);
const user = new UserModel({username,email,password:hashedPassword})
await user.save();
return res.status(201).send({
    success: true,
    message: "New User Created",
    user,
  })
}
 catch(err){
    console.log(err)
    return res.status(500).send({
        message: "Error In Register callback",
        success: false,
        err,
      });
}
}
// get all users
exports.getAllUsers = async (req:any, res:any) => {
  try {
    const users = await UserModel.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "all users data",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get ALl Users",
      error,
    });
  }
};
//login
export const loginController = async (req:any, res:any) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email or password",
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "email is not registerd",
      });
    }
    //password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invlid username or password",
      });
    }
    const token=jwt.sign({_id:user._id,username:user.username,email:user.email},process.env.SECRET ?? "",{expiresIn:"3d"})
        const users = user as Document & {_doc?: any}
        const {password:pass,...info}= users._doc || users
        res.cookie("token",token).status(200).json({
          message:"successfully login",
          info:info
        })
    // return res.status(200).send({
    //   success: true,
    //   messgae: "login successfully",
    //   user,
    // });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Login Callcback",
      error,
    });
  }
};
export const logout = async(req:any,res:any)=>{
     try{
      res.clearCookie("token",{sameSite:"none",secure:true}).status(200).send("User logged out successfully!")
     }catch(err){
      res.status(500).json(err)
     }
}