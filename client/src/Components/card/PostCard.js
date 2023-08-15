import React, { useContext } from "react";
import moment from "moment";
import { Avatar } from "antd";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { UserContext } from "../../context";
import "./card.css";
import Comment from "../User/comment/Comment";

function PostCard({ posts, handleDelete, handleLike, handleUnlike }) {
  const [state, setState] = useContext(UserContext);
  return (
    <>
      {posts &&
        posts.map((post) => (
          <div key={post._id}>
            <div className="card mb-3">
              <div
                className="card-header card-color"
                style={{ backgroundColor: "#041633", color: "white" }}
              >
                <div>
                  {/* Profile image show */}
                  {post.postedBy.image && post.postedBy.image.url ? (
                    <Avatar size={40} src={post.postedBy.image.url} />
                  ) : (<Avatar size={40} className="mb-2">
                    {post.postedBy.name[0].toUpperCase()}
                  </Avatar>)}
                  
                  <span className="mb-2 mx-2">{post.postedBy.name}</span>
                  <span className=" pt-3 mb-2 mx-2 date">
                    {moment(post.createdAt).fromNow()}
                  </span>

                  {state &&
                    state.user &&
                    state.user._id === post.postedBy._id && (
                      <>
                        <DeleteOutlineIcon
                          onClick={() => handleDelete(post)}
                          className="text-danger"
                          style={{
                            position: "absolute",
                            top: 1,
                            right: 2,
                            cursor: "pointer",
                          }}
                        />
                      </>
                    )}
                </div>
              </div>
              <div
                className="card-body card-body-color"
                style={{ backgroundColor: "#040c25", color: " white" }}
              >
                <div>{post.postContent}</div>
              </div>
              <div
                className="card-footer card-color"
                style={{ backgroundColor: "#041633", color: "white" }}
              >
                {post.image && (
                  <img
                    src={post.image && post.image.url}
                    alt={post.postedBy.name}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                )}
                <div className="pt-3 d-flex">
                  {post.likes.includes(state.user._id) ? (<FavoriteIcon style={{cursor: "pointer"}}
                      onClick={() => handleUnlike(post._id)}
                      className="text-danger "
                    />) : (<FavoriteBorderIcon style={{cursor: "pointer"}}
                      onClick={() => handleLike(post._id)}
                      className="text-danger "
                    />)}

                  <div className="mx-2">{post.likes.length} like</div>
                  
                  <div>
                  <Comment postId = {post._id} />
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default PostCard;
