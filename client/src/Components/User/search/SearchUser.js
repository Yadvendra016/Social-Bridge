import React, { useContext, useState } from "react";
import { UserContext } from "../../../context";
import "./search.css";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import PeopleCard from "../../card/PeopleCard";
import { toast } from "react-toastify";

function SearchUser() {
  const [state, setState] = useContext(UserContext);

  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  // const searchUser = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await axios.get(`/search-user/${query}`);
  //     setResult(data);
  //   } catch (error) {
  //     console.log("Search User =>", error);
  //   }
  // };

  // Real-time search function
  const handleSearch = async (value) => {
    setQuery(value);
    if (value.trim() === "") {
      setResult([]); // Reset the search results if the query is empty
      return;
    }
    try {
      const { data } = await axios.get(`/search-user/${value}`);
      setResult(data);
    } catch (error) {
      console.log("Search User =>", error);
    }
  };

  const handleFollow = async(user) =>{
    // console.log("floolw");
    try {
      const { data } = await axios.put("/user-follow", { _id: user._id }); // we send only id

      //update local Storage --> update user
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));

      //update context
      setState({ ...state, user: data });

      //update people state (helps when user follow it will remove from people array)
      let filtered = result.filter((p) => p._id !== user._id);
      setResult(filtered);

      toast.success(`following ${user.name}`);
      //rerender the post in news feed
    } catch (error) {
      console.log("Error while handleFollow in dasboard.js => ", error);
    }

  }
  const handleUnfollow = async(user) =>{
    try {
      const {data} = await axios.put('/user-unfollow', {_id: user._id});

       //update local Storage --> update user
    let auth = JSON.parse(localStorage.getItem("auth"));
    auth.user = data;
    localStorage.setItem('auth', JSON.stringify(auth));

    //update context
    setState({...state, user: data});

     //update people state (helps when user follow it will remove from people array)
     let filtered = result.filter((p) => p._id !== user._id);
     setResult(filtered);
     

  } catch (error) {
      console.log("handleUnfollow =>",error);
  }

  }

  return (
    <>
      <form className="form-inline pt-1 pb-2 row">
        <div className="col-9">
          <input
            onChange={(e) => handleSearch(e.target.value)}
            value={query}
            className="form-control mr-sm-2"
            placeholder="Search (eg: yadvendra)"
            type="search"
            style={{backgroundColor: "#041633", color: "white"}}
          />
        </div>
        <div className="col-2">
          <button
            type="submit"
            className="btn btn-outline-primary"
          >
            <SearchOutlined />
          </button>
        </div>
      </form>

      {result && result.length > 0 && <PeopleCard handleFollow={handleFollow} handleUnfollow={handleUnfollow} people={result} />}
    </>
  );
}

export default SearchUser;
