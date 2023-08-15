import React, { useContext } from "react";
import moment from "moment";
import { Avatar } from "antd";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { UserContext } from "../../context";
import "./card.css";

function CommentCard({ posts }) {
  const [state, setState] = useContext(UserContext);

  return (
    <>
      {posts.map((post) => (
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
                ) : (
                  <Avatar size={40} className="mb-2">
                    {post.postedBy.name[0].toUpperCase()}
                  </Avatar>
                )}

                <span className="mb-2 mx-2">{post.postedBy.name}</span>
                <span className="pt-3 mb-2 mx-2 date">
                  {moment(post.created).fromNow()} {/* Note: Change createdAt to created */}
                </span>

                {/* {state &&
                  state.user &&
                  state.user._id === post.postedBy._id && (
                    <>
                      <DeleteOutlineIcon
                        onClick={() => handleDelete(post._id, post)}
                        className="text-danger"
                        style={{
                          position: "absolute",
                          top: 1,
                          right: 2,
                          cursor: "pointer",
                        }}
                      />
                    </>
                  )} */}
              </div>
            </div>
            <div
              className="card-body card-body-color"
              style={{ backgroundColor: "#040c25", color: " white" }}
            >
              <div>{post.text}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default CommentCard;
