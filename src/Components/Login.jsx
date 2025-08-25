import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userslics";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("alia1@gmail.com");
  const [password, setPassword] = useState("bhW@123#");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isloginform, setIsloginform] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (err) {
      console.log(err);
      setError(err?.response?.data || "🤔 Hmm... that didn’t work...");
    }
  };

  const handleSignup = async() => {
    try{
      const res = await axios.post(BASE_URL + "/signup", {firstName, lastName, emailId, password}, {withCredentials: true});
      dispatch(addUser(res.data));
      navigate("/profile");
    } catch(err){
      console.log(err);
      setError(err?.response?.data || "🤔 Hmm... that didn’t work...");
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isloginform ? "Login" : "Sign Up"}
          </h2>

          {/* Signup fields */}
          {!isloginform && (
            <>
              <div>
                <label className="text-sm text-gray-600">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="John"
                />
              </div>
              <div className="mt-3">
                <label className="text-sm text-gray-600">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Doe"
                />
              </div>
            </>
          )}

          {/* Email */}
          <div className="mt-3">
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              placeholder="example@email.com"
            />
          </div>

          {/* Password */}
          <div className="mt-3">
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}

          {/* Button */}
          <div className="card-actions justify-center mt-6">
            <button
              className="btn btn-primary w-full py-2 text-lg tracking-wide"
              onClick={isloginform ? handleLogin : handleSignup}
            >
              {isloginform ? "Login" : "Sign Up"}
            </button>
          </div>

          {/* Toggle */}
          <p
            className="text-center mt-6 text-sm text-gray-600 hover:text-indigo-600 cursor-pointer transition"
            onClick={() => setIsloginform((value) => !value)}
          >
            {isloginform
              ? "New here? Create an account"
              : "Already have an account? Log in"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
