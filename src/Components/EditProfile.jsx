import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userslics";
import axios from "axios";
import { toast } from "react-toastify"; // ✅ import toastify

const EditProfile = ({ user }) => {
  const [firstName, setfirstName] = useState(user?.firstName || "");
  const [lastName, setlastName] = useState(user?.lastName || "");
  const [age, setage] = useState(user?.age || "");
  const [gender, setgender] = useState(user?.gender || "");
  const [about, setabout] = useState(user?.about || "");
  const [photoUrl, setphotoUrl] = useState(user?.photoUrl || "");

  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));

      // ✅ Success toast
      toast.success("Profile updated successfully 🎉");
    } catch (err) {
      const msg = err?.response?.data || "🤔 Hmm... that didn’t work...";
      setError(msg);

      // ❌ Error toast
      toast.error(msg);
    }
  };

  return (
    <div className="flex justify-center gap-12 my-10">
      {/* Left: Edit Form */}
      <div className="card bg-base-300 w-[28rem] shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              value={firstName}
              className="input"
              onChange={(e) => setfirstName(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset mt-2">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              value={lastName}
              className="input"
              onChange={(e) => setlastName(e.target.value)}
            />
          </fieldset>

          {/* Age + Gender in same row */}
          <div className="flex gap-4 mt-1">
            <fieldset className="fieldset flex-1">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="number"
                value={age}
                className="input"
                onChange={(e) => setage(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset flex-1">
              <legend className="fieldset-legend">Gender</legend>
              <select
                className="select w-full"
                value={gender}
                onChange={(e) => setgender(e.target.value)}
              >
                <option value="">Select</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
              </select>
            </fieldset>
          </div>

          <fieldset className="fieldset mt-2">
            <legend className="fieldset-legend">About</legend>
            <input
              type="text"
              value={about}
              className="input"
              onChange={(e) => setabout(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset mt-2">
            <legend className="fieldset-legend">Photo URL</legend>
            <input
              type="text"
              value={photoUrl}
              className="input"
              onChange={(e) => setphotoUrl(e.target.value)}
            />
          </fieldset>

          <p className="text-red-500 p-2">{error}</p>

          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={saveProfile}>
              Save Profile
            </button>
          </div>
        </div>
      </div>

      {/* Right: Live Preview User Card */}
      <div className="flex items-start">
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoUrl }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
