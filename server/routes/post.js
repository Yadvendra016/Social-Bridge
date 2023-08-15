import express from "express";
import formidable from "express-formidable";
// middleware
import { canDeletePost, requireSignIn } from "./../middleware/index";
import {
  createPost,
  postByUser,
  uploadImage,
  deletePost,
  likePost,
  unlikePost,
  getPost,
  addComment,
  removeComment,
} from "../controllers/post";

const router = express.Router();

//post creation
router.post("/create-post", requireSignIn, createPost);
router.post(
  "/upload-image",
  requireSignIn,
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  uploadImage
);
//post-rendering
router.get("/user-posts", requireSignIn, postByUser);
// delete post
router.delete("/delete-post/:_id", requireSignIn, canDeletePost, deletePost);
//like-unlike post
router.put("/like-post", requireSignIn, likePost);
router.put("/unlike-post", requireSignIn, unlikePost);
router.get("/post/:username", getPost);
// commenst
router.put("/add-comment", requireSignIn, addComment);
router.put("/remove-comment", requireSignIn, removeComment);
module.exports = router;
