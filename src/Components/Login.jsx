import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userslics";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("thala@gmail.com");
  const [password, setPassword] = useState("bhW@123#");
const dispatch = useDispatch();
const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        
       BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
        
      );
      // console.log(res.data);
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <fieldset className="fieldset ">
            <legend className="fieldset-legend">Email Id</legend>
            <input
              type="text"
              value={emailId}
              className="input"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset ">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="text"
              value={password}
              className="input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
