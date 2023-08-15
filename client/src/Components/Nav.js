import React, { useEffect, useState, useContext } from "react";
import { Avatar } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import {
  UserOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Dropdown, Modal } from "react-bootstrap";
import SearchUser from "./User/search/SearchUser";

function Nav() {
  const [current, setCurrent] = useState("");
  const [state, setState] = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);

  //logout function
  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    navigate("/login");
  };

  return (
    <nav className="nav d-flex justify-content-between semiBackground fixed-top">
      <Link to="/home" className="nav-link text-light logo">
        <Avatar size={40} src={"/images/logo.png"} /> SocialBridge
      </Link>

      {/* Home link  */}
      {state && (
        <>
        
          <Link
            to="/home"
            className={`nav-link font-weight-bold  ${
              current === "/home" ? "text-primary border-bottom" : "text-light"
            }`}
            style={{ fontSize: "20px" }}
          >
            Home
          </Link>
         

          {/* DropDown start */}
          <Dropdown
            onToggle={(show) => setShowDropdown(show)}
            show={showDropdown}
            drop="down"
            className="nav-link"
          >
            <Dropdown.Toggle as={CustomToggle} id="dropdownMenuButton1">
              {/* Profile image */}
              {state.user.image && state.user.image.url ? (
                <Avatar size={50} src={state.user.image.url} />
              ) : (
                <Avatar size={50}>
                  {state?.user?.name?.charAt(0).toUpperCase()}
                </Avatar>
              )}
            </Dropdown.Toggle>

            <Dropdown.Menu
              className="dropdown-menu p-0"
              style={{ backgroundColor: "#001529" }}
            >
              {/* link for Profile */}
              <Link to={`/user/${state.user.username}`} className={`nav-link dropdown-item `}>
                <UserOutlined className="mr-2" />
                Profile
              </Link>
              {/* Link for updatepage */}
              <Link
                to="/user/profile/update"
                className={`nav-link dropdown-item`}
              >
                <SettingOutlined className="mr-2" />
                Update Profile
              </Link>

              {/* Link for Settings */}
              {/* <Link to="/settings" className={`nav-link dropdown-item`}>
                <SettingOutlined className="mr-2" />
                Settings
              </Link> */}

              {/* Link for Help */}
              <Link to="/help" className={`nav-link dropdown-item`}>
                <QuestionCircleOutlined className="mr-2" />
                Help
              </Link>

              <p
                onClick={logout}
                className="nav-link dropdown-item"
                style={{ cursor: "pointer" }}
              >
                <LogoutOutlined className="mr-2" />
                Logout
              </p>
            </Dropdown.Menu>
          </Dropdown>
        </>
      )}
      {/* <Link
        to="/register"
        className={`nav-link font-weight-bold  ${current === "/register" ? "text-primary border-bottom" : "text-light"}`}
        style={{ fontSize: "20px" }}
      >
        Register
      </Link>
      <Link
        to="/login"
        className={`nav-link font-weight-bold  ${current === "/login" ? "text-primary border-bottom" : "text-light"}`}
        style={{ fontSize: "20px" }}
      >
        Login
      </Link> */}
    </nav>
  );
}

// Custom Toggle component to remove caret icon
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ cursor: "pointer" }}
  >
    {children}
  </div>
));

export default Nav;
