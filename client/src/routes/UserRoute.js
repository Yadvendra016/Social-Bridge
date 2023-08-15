// access when user Token is verified
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import { useContext, useEffect, useState } from "react";
import { SyncOutlined } from "@ant-design/icons";

const UserRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const navigate = useNavigate();

  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    if (state && state.token) getCurrentUser();
  }, [state && state.token]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get("/current-user");

      if (data.ok) setOk(true);
    } catch (error) {
      navigate("/login");
    }
  };

  // it will run when we are in client side and there nothing in the state
  useEffect(() => {
    if (typeof window !== "undefined" && state === null) {
      setTimeout(() => {
        getCurrentUser();
      }, 1000);
    }
  }, []);

  return !ok ? (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
    <div className="fade-in-out">
      <h1 style={{ fontSize: "48px" }}>SocialBridge</h1>
    </div>
    <SyncOutlined style={{ fontSize: "24px", marginTop: "20px" }} spin />
  </div>
  ) : (
    <>{children}</>
  );
};

export default UserRoute;