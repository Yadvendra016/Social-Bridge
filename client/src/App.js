import { Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./Components/Nav";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { UserProvider } from "./context";
import Home from './Components/Home';
import UpdateProfile from "./Components/User/profile/UpdateProfile";
import Following from "./Components/User/following/Following";
import Profile from "./Components/User/profile/Profile";
import Followers from "./Components/User/Followers/Followers";

function App() {
  return (
    <UserProvider>
      <Nav />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user/profile/update" element={<UpdateProfile />} />
        <Route path="/user/:username/following" element={<Following />} />
        <Route path="/user/:username/followers" element={<Followers />} />
        <Route path="/user/:username" element={<Profile />} />

      </Routes>
    </UserProvider>
  );
}

export default App;
