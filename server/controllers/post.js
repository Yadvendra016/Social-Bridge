import Post from "../models/post.js";
import cloudinary from "cloudinary";
import User from "../models/user.js";

//config cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const createPost = async (req, res) => {
  // console.log("Post => ", req.auth._id);
  const { postContent, image } = req.body;

  if (!postContent.length) {
    return res.json({
      error: "Content is required",
    });
  }
  try {
    const post = new Post({ postContent, image, postedBy: req.auth._id });
    post.save();
    res.json(post);
  } catch (error) {
    console.log("Error while creating post server =>", error);
    res.status(400).send("Server Down !Try again letter");
  }
};

export const uploadImage = async (req, res) => {
  // console.log(req.files.image.path);
  try {
    const result = await cloudinary.uploader.upload(req.files.image.path);
    // console.log(result);
    res.json({
      url: result.secure_url, // http url
      public_id: result.public_id,
    });
  } catch (error) {
    console.log("ERROR WHILE UPLOAD IMAGE SERVER => ", error);
  }
};

// post-rendring
export const postByUser = async (req, res) => {
  try {
    // const posts = await Post.find({ postedBy: req.auth._id }).populate(
    // const posts = await Post.find().populate(
    //   "postedBy",
    //   "_id name image"
    // ).sort({createdAt: -1}).limit(50);
    // // console.log(posts);
    // res.json(posts);

    const user = await User.findById(req.auth._id);
    let following = user.following;

    //following array contains all the following users 
    following.push(req.auth._id);

    const posts = await Post.find({postedBy: {$in: following}})
    .populate('postedBy', '_id name image')
    .populate('comments.postedBy', '_id name image')
    .sort({createdAt: -1})

    res.json(posts);

  } catch (error) {
    console.log("Error while post-rendering SERVER =>", error);
  }
};

//delete post
export const deletePost = async (req,res) =>{
  try {
    const post = await Post.findByIdAndDelete(req.params._id);
    if(post.image && post.image.public_id){
      const image = await cloudinary.uploader.destroy(post.image.public_id);
    }
    res.json({ok: true});
  } catch (error) {
    console.log("Error while Delete Post server =>", error);
    
  }
}

// like post
export const likePost = async (req,res) =>{
  try {
    const post = await Post.findByIdAndUpdate(req.body._id, {
      $addToSet: {likes: req.auth._id}
    },{new: true});
    res.json(post);
  } catch (error) {
    console.log("Like Post =>", error);
  }
}

//unlike post
export const unlikePost = async (req,res) =>{
  try {

    const post = await Post.findByIdAndUpdate(req.body._id, {
      $pull: {likes: req.auth._id}
    },{new: true});

    res.json(post);
    
  } catch (error) {
    console.log("unlikePost",error);
  }
}

// get post for profile page
export const getPost = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await Post.find({ postedBy: user._id })
      .populate('postedBy', '_id name image')
      .populate('comments.postedBy', '_id name image')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.log("get Post =>", error);
    res.status(500).json({ error: "Server error" });
  }
}

// comments
// add Comment
export const addComment = async (req,res) =>{
  try {
    const {postId, comment} = req.body;
    const post = await Post.findByIdAndUpdate(postId, {
      $push: {comments: {text: comment, postedBy: req.auth._id}}
    },{new: true})
    .populate('postedBy', '_id name image')
    .populate('comments.postedBy', '_id name image')
    // console.log(post);

    res.json(post);

  } catch (error) {
    console.log("Add Comments =>",error);
  }
}

// remove comment
export const removeComment = async (req, res) =>{
  try {
    const {postId, comment} = req.body;

    const post = await Post.findByIdAndUpdate(postId, {
      $pull: {comments: {_id: comment._id}}
    }, {new: true})

    res.json(post);

  } catch (error) {
    console.log("Remove Comment => ", error);
  }
}