import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, List } from 'antd';
import { UserContext } from '../../../context';

function Followers({ username }) {
  const [followers, setFollowers] = useState([]);
  const [state] = useContext(UserContext);

  useEffect(() => {
    if (state && state.token) {
      fetchFollowers();
    }
  }, [state && state.token]);

  const fetchFollowers = async () => {
    try {
      const { data } = await axios.get(`/user/${username}/followers`);
      console.log("Followers data:", data);
      setFollowers(data);
    } catch (error) {
      console.log("Error fetching followers:", error);
    }
  };

  return (
    <>
      <div className="row col-md-6 offset-md-3">
        <List
          itemLayout="horizontal"
          dataSource={followers}
          renderItem={(user) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  user.image && user.image.url ? (
                    <Avatar size={20} src={user.image.url} />
                  ) : (
                    <Avatar size={20}>
                      {user?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                  )
                }
                title={
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      {user.name}
                      <span className="username">{user.username}</span>
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </>
  );
}

export default Followers;
