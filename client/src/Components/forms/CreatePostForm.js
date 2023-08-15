import React, { useContext } from "react";
import { Button, Avatar } from "antd";
import {
  CameraOutlined,
  LoadingOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import "./form.css";
import { UserContext } from "../../context";

const CreatePostForm = ({
  postContent,
  setPostContent,
  postSubmit,
  handleImage,
  uploading,
  image,
}) => {
  const [state, setState] = useContext(UserContext);

  return (
    <div
      className="card p-2 border border-dark"
      style={{ backgroundColor: "#041633" }}
    >
      <div className="d-flex mb-2 align-items-center col-auto">
        {/* profile image show */}
        {state.user.image && state.user.image.url ? (
          <Avatar
            size={40}
            style={{ marginBottom: "32px" }}
            src={state.user.image.url}
          />
        ) : (
          <Avatar style={{ marginBottom: "32px" }} size={40} className="mb-2">
            {state.user.name[0].toUpperCase()}
          </Avatar>
        )}
        
        <form name="createPostForm " className="flex-grow-1 ms-2 ">
          <div className="form-group mb-1">
            <textarea
              className="form-control"
              placeholder="What's happening?"
              rows={3}
              onChange={(e) => setPostContent(e.target.value)}
              value={postContent}
              style={{
                backgroundColor: "#040c25",
                color: "white",
                border: "none",
                resize: "none",
              }}
            />
          </div>
          <div className="d-flex justify-content-between py-2">
            <div className="d-flex">
              {/* for image input */}
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                {image && image.url ? (
                  <Avatar size={30} src={image.url} className="mt-1" />
                ) : uploading ? (
                  <LoadingOutlined style={{ color: "blue" }} className="mt-2" />
                ) : (
                  <CameraOutlined
                    style={{ color: "white", marginRight: "5px" }}
                  />
                )}

                <input
                  onChange={handleImage}
                  type="file"
                  accept="images/*"
                  hidden
                />
              </label>

              {/* for video input */}
              {/* <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
              >
                <VideoCameraOutlined
                  style={{ color: "white", marginRight: "5px" }}
                />
                <input
                  type="file"
                  style={{ display: "none" }}
                  accept="video/*"
                />
              </label> */}
            </div>
            <Button
              type="primary"
              className="flex-shrink-0 custom-placeholder-color"
              style={{ color: "#666" }}
              disabled={postContent.trim() === "" && !image.url}
              onClick={postSubmit}
            >
              Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm;
