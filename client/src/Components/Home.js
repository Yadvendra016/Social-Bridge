import React from "react";
import UserRoute from "./../routes/UserRoute";
import Post from "./post/Post";
import People from './sidebar/People';
import SearchUser from "./User/search/SearchUser";

function Home() {
  

  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="row py-3">
          <div className="col-md-3 ">
            <SearchUser />
          </div>
          {/* Post Render */}
          <div className="col-md-6">
            <Post />
          </div>
          <div className="col-md-3">
            
            <People/>
          </div>
        </div>
      </div>
    </UserRoute>
  );
}

export default Home;
