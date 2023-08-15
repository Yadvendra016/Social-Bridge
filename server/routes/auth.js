import express from "express";
import {
  Login,
  Register,
  currentUser,
  profileUpdate,
  findPeople,
  addFollower,
  userFollow,
  userFollowing,
  removeFollower,
  userUnfollow,
  searchUser,
  getUser,
  getFollowers,
} from "../controllers/auth";
import { requireSignIn } from "../middleware";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
//Authorisation by verify token
router.get("/current-user", requireSignIn, currentUser);
//update-profile
router.put("/profile-update", requireSignIn, profileUpdate);
// find not followed people
router.get("/find-people", requireSignIn, findPeople);
//to follow
router.put("/user-follow", requireSignIn, addFollower, userFollow);
//following page
router.get("/user/:username/following", requireSignIn, userFollowing);
//followers page
router.get("/user/:username/followers", requireSignIn, getFollowers);
//unfollow
router.put("/user-unfollow", requireSignIn, removeFollower, userUnfollow);
// search-user
router.get("/search-user/:query", searchUser);
//profile-section
router.get("/user/:username", getUser)

module.exports = router;
