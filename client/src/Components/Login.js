import React, { useState, useContext, useEffect } from "react";
import AuthForm from "./forms/AuthForm";
import axios from 'axios';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { UserContext } from "../context";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [state, setState] = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const {data} = await axios.post("/login",{email, password});
      
      // console.log(data);
      setState({
        user: data.user,
        token: data.token
      });
      // save in local storage
      window.localStorage.setItem('auth',JSON.stringify(data));
      navigate("/home");

      setLoading(false);

    } catch (err) {
      if (err.response && err.response.data) {
        // Check if err.response exists and has data property
        toast.error(err.response.data);
      } else {
        // Handle the error if err.response or err.response.data is undefined
        toast.error("An error occurred");
      }
    }
    setLoading(false);
  };
 // redirect to home page when state contain token
 useEffect(() => {
  if (state && state.token) {
    navigate("/home");
  }
}, [state]);
  return (
    <div className="container-fluid ">
      <div className="row py-5 text-light bg-default-image">
        <div className="col text-center">
          <h1>Login</h1>
        </div>
      </div>
      <div className="row py-1">
        <div className="col-md-6 offset-md-3">
          <AuthForm
           page = "login"
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
      </div>
      <div className="row">
        <div className="col">
          <p className="text-center">
            Do not have account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
