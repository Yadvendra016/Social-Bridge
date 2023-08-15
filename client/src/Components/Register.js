import React, { useState, useContext, useEffect } from "react";
import AuthForm from "./forms/AuthForm";
import axios from 'axios';
import { toast } from "react-toastify";
import { Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const[state,setState] = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const {data} = await axios.post("/register",{name, email, password});
      setName("");
      setEmail("");
      setPassword("");
      setOk(data.ok);

      setLoading(false);

    } catch (error) {
      console.log("Error in handleSubmit => ", error);
      toast.error(error.response.data);
      setLoading(false);
    }

  };

  // redirect to home page when state contain token
  useEffect(() => {
    if (state && state.token) {
      navigate("/home");
    }
  }, [state]);

  return (
    <div className="container-fluid ">
      <div className="row py-5 text-light">
        <div className="col text-center">
          <h1>Register</h1>
        </div>
      </div>
      <div className="row py-1">
        <div className="col-md-6 offset-md-3">
          <AuthForm
           name={name} 
           setName={setName}
           email={email}
           setEmail={setEmail}
           password={password}
           setPassword={setPassword}
           handleSubmit={handleSubmit} 
           loading={loading}
           />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Modal
            title="Congratulations!"
            open={ok}
            onCancel={() => setOk(false)}
            footer={null}
          >
            <p>You have successfully registered.</p>
            <Link to="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
          </Modal>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="text-center">
            Already registered? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
