import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context';
import axios from 'axios';
import "./sidebar.css"
import { toast } from 'react-toastify';
import PeopleCard from '../card/PeopleCard';
import { Link } from 'react-router-dom';

function People({username}) {
    const [people, setPeople] = useState([]);
    const [state, setState] = useContext(UserContext);


    useEffect(() =>{
        if(state && state.token){
            findPeople();
        }
    },[state && state.token]);

    const findPeople = async () =>{
        try {
            const {data} = await axios.get("/find-people");
            setPeople(data);
        } catch (error) {
            console.log("find People =>",error);
        }
    }

    //handle follow
    const handleFollow = async (user) => {
        // console.log("add this user to following list", user);
        try {
          const { data } = await axios.put("/user-follow", { _id: user._id }); // we send only id
    
          //update local Storage --> update user
          let auth = JSON.parse(localStorage.getItem("auth"));
          auth.user = data;
          localStorage.setItem("auth", JSON.stringify(auth));
    
          //update context
          setState({ ...state, user: data });
    
          //update people state (helps when user follow it will remove from people array)
          let filtered = people.filter((p) => p._id !== user._id);
          setPeople(filtered);
    
          toast.success(`following ${user.name}`);
          //rerender the post in news feed
        } catch (error) {
          console.log("Error while handleFollow in dasboard.js => ", error);
        }
      };

  return (
    <>
    <div className="row">
        <div className="col">
          {state && state.user && state.user.following &&
            <Link to={`/user/${username}/following`} className="btn btn-primary mb-2">
              <span className="font-weight-bold">{state.user.following.length}</span> Following
            </Link>
          }
          {state && state.user && state.user.followers &&
            <Link to={`/user/${username}/followers`} className="btn btn-info mx-4 mb-2 ">
              <span className="font-weight-bold">{state.user.followers.length}</span> Followers
            </Link>
          }
          
          <h3 className='mt-4'>Suggestions to follow</h3>
          <PeopleCard people={people} handleFollow={handleFollow} />
        </div>
      </div>
    </>
  )
}

export default People;
