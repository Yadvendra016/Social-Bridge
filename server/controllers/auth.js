import { comparePassword, hashPassword } from "../helpers/auth";
import User from "../models/user";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";

// Regsiter
export const Register = async (req, res) => {
  const { name, email, password } = req.body;
  // validation
  if (!name) return res.status(400).send("Name is Required");
  if (!password) return res.status(400).send("Password is Required");
  if (password.length < 6)
    res.status(400).send("Password should be more than 6 charector");
  if (!email) return res.status(400).send("Email is Required");

  // check if user already exist
  const exist = await User.findOne({ email });
  if (exist) return res.status(400).send("Email already exist"); // send msg if email already exist

  // hashed
  const hash = await hashPassword(password);

  const user = new User({
    name,
    email,
    password: hash,
    username: nanoid(6),
  });
  try {
    await user.save();
    // console.log("REGISTERD USER =>",user);
    return res.json({ ok: true });
  } catch (error) {
    console.log("REGISTERED FAILED =>", error);
    return res.status(400).send("Error, Try again");
  }
};

export const Login = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;
    //*Check if our database has user with that username
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("user Does not exist");

    //check password
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).send("Incorrect Password");

    // create a jwt token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    }); // to create sign token

    // we are not saving user password
    user.password = undefined;

    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log("ERROR WHILE LOGIN =>", err);
    return res.status(400).send("Error, Try again");
  }
};

// check user Authorisation
export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.auth._id);

    res.json({ ok: true });
  } catch (error) {
    console.log("Error in CurrentUser =>", error);
    res.send(400);
  }
};

// update profile
export const profileUpdate = async (req, res) => {
  try {
    const data = {};
    if(req.body.username){
      data.username = req.body.username;
    }
    if(req.body.about){
      data.about = req.body.about
    }
    if(req.body.name){
      data.name = req.body.name
    }
    if(req.body.newPassword){
      if(req.body.newPassword < 6){
        return res.json({
          error: "Password is required and should be min 6 charector long",
        });
      }
      else{
        data.password = req.body.newPassword;
      }
    }
    if(req.body.image){
      data.image = req.body.image;
    }
    let user = await User.findByIdAndUpdate(req.auth._id, data,{new: true});
    user.password = undefined;
    res.json(user);
    
    

  } catch (error) {
    if(error.code == 11000){  // if username is equal
        return res.json({error: "Username already exist"});
    }
    console.log("ProfileUpdate =>", error);
  }
};


// find people who are not followed
export const findPeople = async (req,res) =>{
  try {
    const user = await User.findById(req.auth._id);
    //user.following
    let following = user.following; // following has arrays of user id
    following.push(user._id);

    //find the people (except user in the following array)
    const people = await User.find({ _id: { $nin: following } })
      .select("-password")
      .limit(10);
    res.json(people);
  } catch (error) {
    console.log("Error in findPeople server =>", error);
  }
};

// middleware => when click on follow my id add on that users follwers array
export const addFollower = async(req, res, next) =>{
  try {

    const user = await User.findByIdAndUpdate(req.body._id, {
      $addToSet: {followers: req.auth._id}
    });
    next();
    
  } catch (error) {
    console.log("Error whiel addFollower middleware controler =>", error);
  }
}
// follow people +> that user _id add in my following array
export const userFollow = async(req,res) =>{
  try {

    const user = await User.findByIdAndUpdate(req.auth._id, {
      $addToSet: {following: req.body._id}
    }, {new: true})
    .select("-password");
    res.json(user);
    
  } catch (error) {
    console.log("Error userFollow controller => ", error);
  }
}

//Following page show the all follwoing user
export const userFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.auth._id);
    const following = await User.find({ _id: user.following });
    res.json(following);
  } catch (error) {
    console.log("error from controller userFollowing", error);
  }
};

// follwers page
export const getFollowers = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const followers = await User.find({ _id: { $in: user.followers } }).select("-password");
    // console.log(followers);

    res.json(followers);

  } catch (error) {
    console.log("Error in getFollowers controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//meddleware
export const removeFollower = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.body._id, {
      $pull: { followers: req.auth._id },
    });
    next();
  } catch (error) {
    console.log("removeFollower =>", error);
  }
};

export const userUnfollow = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.auth._id,
      {
        $pull: { following: req.body._id },
      },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.log("userUnfollow =>", error);
  }
};

// search user
export const searchUser = async (req,res) =>{
  const {query} = req.params;
  if(!query) return;
  try {
    const user = await User.find({
      $or: [
        {name: {$regex: query, $options: 'i' }}, // i -> case insensitve
        {username: {$regex: query, $options: 'i' }}
      ]
    }).select("-password");
    res.json(user);
  } catch (error) {
    console.log("SearchUser=>",error);
  }
}

// get user for profile section
export const getUser = async (req,res) =>{
  try {
    const user = await User.find({username: req.params.username}).select("-password");
    res.json(user);
  } catch (error) {
    console.log("get User =>",error);
  }
}