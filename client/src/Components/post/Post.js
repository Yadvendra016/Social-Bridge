import CreatePostForm from "../forms/CreatePostForm";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../context";
import PostCard from "../card/PostCard";
import { Modal } from "antd";
import "./post.css";

function Post() {
  const [postContent, setPostContent] = useState("");
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [state, setState] = useContext(UserContext);
  const [deletePost, setDeletePost] = useState(null);

  // when ever page render then it fetch the post
useEffect(() => {
    if (state && state.token && state.user && state.user._id) {
      fetchUserPosts();
    }
  }, [state && state.token, state && state.user && state.user._id]);

  // for showing the post
  const fetchUserPosts = async () => {
    try {
      const { data } = await axios.get("/user-posts");
      setPosts(data);
    } catch (error) {
      console.log("ERROR while post-fetching Client => ", error);
    }
  };

  // for submit the post
  const postSubmit = async (e) => {
    e.preventDefault();
    console.log(postContent);
    try {
      const { data } = await axios.post("/create-post", { postContent, image });
      console.log("Post Submit =>", data);
      if (data.error) {
        toast.error(data.error);
      } else {
        fetchUserPosts();
        toast.success("Post is created");
        setPostContent("");
        setImage({});
      }
    } catch (error) {
      console.log("Error from Home =>", error);
    }
  };

  // Image upload
  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const { data } = await axios.post("/upload-image", formData);
      console.log(data);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (error) {
      console.log("Error while upload image => ", error);
      setUploading(false);
    }
  };

  // Handle opening the delete confirmation modal
  const openDeleteModal = (post) => {
    setDeletePost(post);
  };

  // Handle delete confirmation
  const handleDelete = async () => {
    try {
      if (deletePost) {
        const { data } = await axios.delete(`/delete-post/${deletePost._id}`);
        toast.error("Post Deleted");
        fetchUserPosts();
      }
    } catch (error) {
      console.log("Error while Delete image => ", error);
    }
    // Close the modal in any case
    setDeletePost(null);
  };

  //like
  const handleLike = async (_id) => {
    // _id = postId
    // console.log(_id);
    try {
      const { data } = await axios.put("/like-post", { _id });
      console.log("Liked", data);
      fetchUserPosts();
    } catch (error) {
      console.log("handleLike =>", error);
    }
  };

  //unlike
  const handleUnlike = async (_id) => {
    try {
      const { data } = await axios.put("/unlike-post", { _id });
      fetchUserPosts();
    } catch (error) {
      console.log("handleUnlike =>", error);
    }
  };

  return (
    <>
      <CreatePostForm
        postContent={postContent}
        setPostContent={setPostContent}
        postSubmit={postSubmit}
        handleImage={handleImage}
        uploading={uploading}
        image={image}
      />
      <br />
      <PostCard
        posts={posts}
        handleDelete={openDeleteModal}
        handleLike={handleLike}
        handleUnlike={handleUnlike}
      />

      {/* Delete Confirmation Modal */}
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
    </>
  );
}

export default Post;
