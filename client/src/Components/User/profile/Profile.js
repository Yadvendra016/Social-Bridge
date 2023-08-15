import { Avatar, Modal } from "antd";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import "./profile.css";
import PostCard from "../../card/PostCard";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../../context";
import { Link, useParams } from "react-router-dom";
import SearchUser from "../search/SearchUser";
import People from "../../sidebar/People";
import Following from './../following/Following';
import Followers from "../Followers/Followers";

function Profile() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [deletePost, setDeletePost] = useState(null);
  

  const { username } = useParams();
  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    if (username){
      fetchUser();
      fetchPost();
    } 
  }, [username, state && state.user]);

 

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/user/${username}`);
      console.log(data);
      setUser(data);
      console.log(user.name);
    } catch (error) {
      console.log("Profile fetch user =>", error);
    }
  };

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/post/${username}`);
      console.log(data);
      setPosts(data);
    } catch (error) {
      console.log("Fetch user =>", error);
    }
  };

  const handleFollow = async (user) => {
    // console.log("floolw");
    try {
      const { data } = await axios.put("/user-follow", { _id: user._id }); // we send only id

      //update local Storage --> update user
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));

      //update context
      setState({ ...state, user: data });

      //update people state (helps when user follow it will remove from people array)
      let filtered = user.filter((p) => p._id !== user._id);
      setUser(filtered);

      toast.success(`following ${user.name}`);
      //rerender the post in news feed
    } catch (error) {
      console.log("Error while handleFollow in dasboard.js => ", error);
    }
  };
  const handleUnfollow = async (user) => {
    try {
      const { data } = await axios.put("/user-unfollow", { _id: user._id });

      //update local Storage --> update user
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));

      //update context
      setState({ ...state, user: data });

      //update people state (helps when user follow it will remove from people array)
      let filtered = user.filter((p) => p._id !== user._id);
      setUser(filtered);
    } catch (error) {
      console.log("handleUnfollow =>", error);
    }
  };

  //like
  const handleLike = async (_id) => {
    // _id = postId
    // console.log(_id);
    try {
      const { data } = await axios.put("/like-post", { _id });
      console.log("Liked", data);
      fetchPost();
    } catch (error) {
      console.log("handleLike =>", error);
    }
  };

  //unlike
  const handleUnlike = async (_id) => {
    try {
      const { data } = await axios.put("/unlike-post", { _id });
      fetchPost();
    } catch (error) {
      console.log("handleUnlike =>", error);
    }
  };

  // Handle delete confirmation
  const handleDelete = async () => {
    try {
      if (deletePost) {
        const { data } = await axios.delete(`/delete-post/${deletePost._id}`);
        toast.error("Post Deleted");
        fetchPost();
      }
    } catch (error) {
      console.log("Error while Delete image => ", error);
    }
    // Close the modal in any case
    setDeletePost(null);
  };

  // Handle opening the delete confirmation modal
  const openDeleteModal = (post) => {
    setDeletePost(post);
  };

  return (
    <div className="contaner-fluid">
      <div className="row py-3">
        <div className="col-md-1 d-md-block d-none">
          <div style={{ marginLeft: "10px" }}>
            <h2>S</h2>
            <h2>O</h2>
            <h2>C</h2>
            <h2>I</h2>
            <h2>A</h2>
            <h2>L</h2>
            <br />
            <h2>B</h2>
            <h2>R</h2>
            <h2>I</h2>
            <h2>D</h2>
            <h2>G</h2>
            <h2>E</h2>
          </div>
        </div>
        <div className="col-md-7 mb-4">
          <div className="card">
            <div
              className="card-header"
              style={{
                backgroundColor: "#041633",
                color: "white",
                textAlign: "center",
              }}
            >
              {/* Avatar */}
              {user && user[0] && user[0].image && user[0].image.url ? (
                <Avatar size={100} src={user[0].image.url} />
              ) : (
                <Avatar size={100}>
                  {user[0]?.name?.charAt(0).toUpperCase()}
                </Avatar>
              )}
              <h2>{user[0]?.name}</h2>
              <div>
                <h7 style={{ marginRight: "17px" }}>{user[0]?.username}</h7>
                {/* condition to show edit button to self profile and follow/unfollow to others */}
                {state && state.user && state.user._id === user[0]?._id ? (
                  <Link to="/user/profile/update">
                    <button className="btn btn-primary">Edit</button>{" "}
                  </Link>
                ) : state &&
                  state.user &&
                  user[0]?.followers &&
                  user[0].followers.includes(state.user._id) ? (
                  <span
                    onClick={() => handleUnfollow(user[0])}
                    className="text-primary pointer"
                  >
                    Unfollow
                  </span>
                ) : (
                  <span
                    onClick={() => handleFollow(user[0])}
                    className="text-primary pointer"
                  >
                    Follow
                  </span>
                )}
              </div>
              {/* Foolower following */}
              <div className="mb-4 mt-2">
                <span className="mx-3">
                  {" "}
                  {user && user[0]?.followers && user[0].followers?.length}{" "}
                  followers{" "}
                </span>
                <span> {user && user[0]?.following?.length} Following </span>
              </div>
              {/* Bio */}
              <div className="border-top">
                <h3>About</h3>
                <p>{user[0]?.about}</p>
              </div>
            </div>
            <div
              className="card-body"
              style={{ backgroundColor: "#020617", color: "white" }}
            >
              {/* <pre>{JSON.stringify(user, null, 4)}</pre> */}
              <PostCard
                posts={posts}
                handleDelete={openDeleteModal}
                handleLike={handleLike}
                handleUnlike={handleUnlike}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <SearchUser />
          <br />
          <People username={username} />
          <div style={{ display: "none" }}><Following  username={username} /> <Followers username={username} /> </div>
          
        </div>
      </div>
      <Modal
        title="Delete Post"
        open={!!deletePost} // Show the modal if there's a post to delete
        onOk={handleDelete}
        onCancel={() => setDeletePost(null)} // Close the modal on cancel
        okText="Delete"
        cancelText="Cancel"
        className="custom-modal"
      >
        <p>Are you sure you want to delete this post?</p>
      </Modal>
    </div>
  );
}

export default Profile;
