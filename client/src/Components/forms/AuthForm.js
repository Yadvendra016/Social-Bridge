import React from "react";
import {SyncOutlined} from '@ant-design/icons';

function AuthForm({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  page,
  loading,
}) {
  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit}>
        {page !== "login" && (
          <div className="form-group p-2">
            <small>
              <label className="text-white">Your name</label>
            </small>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="Enter your Name"
            />
          </div>
        )}
        <div className="form-group p-2">
          <small>
            <label className="text-white">Email</label>
          </small>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Enter your Email"
          />
        </div>
        <div className="form-group p-2">
          <small>
            <label className="text-white">Password</label>
          </small>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Enter Password"
          />
        </div>
        <div className="form-group p-2">
          <button
            className="btn col-12 text-white"
            style={{ backgroundColor: "#041633" }}
          >
            {loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
