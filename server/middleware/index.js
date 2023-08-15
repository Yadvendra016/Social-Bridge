import {expressjwt} from "express-jwt"
import Post from "../models/post";

// this verify token
export const requireSignIn = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
});

// this verify wheather the user is authorised to delete the post
export const canDeletePost = async (req,res, next) =>{
    try {
        const post = await Post.findById(req.params._id);

        if(req.auth._id != post.postedBy){
            return res.status(400).send("Unauthorised");
        }else{
            next();
        }
        
    } catch (error) {
        console.log("error while authorise canDeletePost",error);
    }
}