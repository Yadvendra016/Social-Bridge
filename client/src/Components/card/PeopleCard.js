import React, { useContext } from "react";
import { UserContext } from "../../context";
import moment from "moment";
import { Avatar, List } from "antd";
import { Link } from "react-router-dom";

function PeopleCard({ people, handleFollow, handleUnfollow }) {
  const [state, setState] = useContext(UserContext);
  return (
    <List
      itemLayout="horizontal"
      dataSource={people}
      renderItem={(user) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              user.image && user.image.url ? (
                <Avatar size={20} src={user.image.url} />
              ) : (
                <Avatar size={20}>{user?.name?.charAt(0).toUpperCase()}</Avatar>
              )
            }
            title={
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Link className="text-decoration-none text-light" to={`/user/${user.username}`} > {user.name} 
                  <span className="username">{user.username}</span>
                  </Link> 
                </div>
                {/* {JSON.stringify(user)} */}
                {state && state.user && user.followers && user.followers.includes(state.user._id) ? (<span
                  onClick={() => handleUnfollow(user)}
                  className="text-primary pointer"
                >
                  Unfollow
                </span>) : (
                    <span
                    onClick={() => handleFollow(user)}
                    className="text-primary pointer"
                  >
                    Follow
                  </span>
                )}
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
}

export default PeopleCard;
