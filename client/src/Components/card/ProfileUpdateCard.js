import { Avatar } from "antd";
import React, { useContext } from "react";
import { UserContext } from "../../context";
import { CameraOutlined, LoadingOutlined, EditFilled } from "@ant-design/icons";

function ProfileUpdateCard({
  username,
  setUsername,
  about,
  setAbout,
  name,
  setName,
  newPassword,
  setNewPassword,
  handleSubmit,
  image,
  uploading,
  handleImage,
}) {
  const [state, setState] = useContext(UserContext);

  return (
    <div
      className="card p-4"
      style={{
        width: "400px",
        boxShadow: "0 4px 8px blue",
        backgroundColor: "#041633",
        color: "white",
      }}
    >
      <div className="row text-light">
        <div className="col text-center">
          <h1>Update Profile</h1>
        </div>
      </div>
      <div className="text-center mb-4 d-flex justify-content-center">
        {/* Profile update */}
        <label
          style={{
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          {image && image.url ? (
            <Avatar size={50} src={image.url} className="mt-1" />
          ) : uploading ? (
            <LoadingOutlined style={{ color: "blue" }} className="mt-2" />
          ) : (
            <CameraOutlined style={{ marginRight: "5px" }} />
          )}
            <EditFilled style={{color: "blue"}} />
          <input onChange={handleImage} type="file" accept="images/*" hidden />
        </label>
      </div>

      <form>
        <div className="form-group mb-2">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            style={{ backgroundColor: "#040c25", color: " white" }}
          />
        </div>
        <div className="form-group mb-2">
          <label>New Password</label>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="form-control"
            type="password"
            placeholder="Enter new Password"
            style={{ backgroundColor: "#040c25", color: " white" }}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="username">Username</label>
          <input
            value={username}
            className="form-control"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            name="username"
            placeholder="Enter your Username"
            required
            style={{ backgroundColor: "#040c25", color: " white" }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="about">About</label>
          <textarea
            className="form-control"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            id="about"
            name="about"
            placeholder="Let Everyone know about you"
            rows="4"
            style={{ backgroundColor: "#040c25", color: " white" }}
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary col-12 mt-2"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default ProfileUpdateCard;
