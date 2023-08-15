import React, { useContext, useEffect, useState } from 'react'


import axios from 'axios';
import moment from "moment";
import { Avatar, List } from 'antd';
import { UserContext } from '../../../context';

function Following({username}) {
    const [people, setPeople] = useState([]);
    const [state, setState] = useContext(UserContext);


    useEffect(() =>{
        if(state && state.token){
            fetchFollowing();
        }
    },[state && state.token]);

    const fetchFollowing = async () =>{
        try {
            const {data} = await axios.get(`/user/${username}/following`);
            console.log("Following data:", data);
            setPeople(data);
        } catch (error) {
            console.log("find People =>",error);
        }
    }

     // when user click on unfollow
    const handleUnfollow = async (user) => {
      try {
          const {data} = await axios.put('/user-unfollow', {_id: user._id});
  
           //update local Storage --> update user
        let auth = JSON.parse(localStorage.getItem("auth"));
        auth.user = data;
        localStorage.setItem('auth', JSON.stringify(auth));
  
        //update context
        setState({...state, user: data});
  
         //update people state (helps when user follow it will remove from people array)
         let filtered = people.filter((p) => p._id !== user._id);
         setPeople(filtered);
         
  
      } catch (error) {
          console.log("handleUnfollow =>",error);
      }
    };

  return (
    <>
      {/* <pre> {JSON.stringify(people,null,4)} </pre> */}
      
      <div className="row col-md-6 offset-md-3">
      {/* <pre>{JSON.stringify(people,null,4)}</pre> */}
      <List
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(user) => (
            <List.Item>
            <List.Item.Meta
            avatar =  {user.image && user.image.url ? (
                <Avatar size={20} src={user.image.url} />
              ) : (
                <Avatar size={20}>
                  {user?.name?.charAt(0).toUpperCase()}
                </Avatar>
              )}
              title={
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {user.name}
                    <span className='username' >{user.username}</span>
                  </div>
                  <span onClick={() => handleUnfollow(user)} className="text-primary pointer">Unfollow</span>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
      
      
    </>
  )
}

export default Following
