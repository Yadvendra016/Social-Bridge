import React, { useState, useContext, useEffect } from "react";
import "./profile.css";
import ProfileUpdateCard from "../../card/ProfileUpdateCard";
import { UserContext } from "../../../context";
import { toast } from "react-toastify";
import axios from "axios";
import UserRoute from './../../../routes/UserRoute';
import { Modal } from 'antd';

function UpdateProfile() {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [ok, setOk] = useState();
  //image upload
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);

  const [state, setState] = useContext(UserContext);


  useEffect(() => {
    if (state && state.user) {
      setUsername(state.user.username);
      setAbout(state.user.about);
      setName(state.user.name);
      setImage(state.user.image);
    }
  }, [state && state.user]);

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/profile-update", {
        username,
        about,
        name,
        newPassword,
        image
      });
    //   console.log(data);
    //update local storage, update user, keep token
    let auth = JSON.parse(localStorage.getItem("auth"));
    auth.user = data;
    localStorage.setItem("auth",JSON.stringify(auth));
    //update context
    setState({...state, user: data});

      setOk(true);
    } catch (error) {
        toast.error(error.response.data);
      console.log("Error while updating profile, ", error);
    }
  };

  // image upload
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

  return (
    <UserRoute>
    <div className="container d-flex justify-content-center align-items-center vh-100">
      
      <ProfileUpdateCard
        username={username}
        setUsername={setUsername}
        about={about}
        setAbout={setAbout}
        name={name}
        setName={setName}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        handleSubmit={handleSubmit}
        image={image}
        setImage={setImage}
        uploading={uploading}
        setUploading={setUploading}
        handleImage={handleImage}
      />
      <div className="row">
        <div className="col">
          <Modal
            title="Congratulations!"
            open={ok}
            onCancel={() => setOk(false)}
            footer={null}
          >
            <p>You have successfully update your profile.</p>
          </Modal>
        </div>
      </div>
    </div>
    </UserRoute>
  );
}

export default UpdateProfile;
