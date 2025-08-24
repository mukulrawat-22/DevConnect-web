import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard"; // Import the profile card component

const Connection = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState(null); // For profile view

  // Fetch connections
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return <h1 className="text-center mt-20">Loading connections...</h1>;
  }

  if (connections.length === 0) {
    return <h1 className="text-center mt-20">No connections found.</h1>;
  }

  // Show UserCard modal if selectedUser is set
  if (selectedUser) {
    return (
      <UserCard
        user={selectedUser}
        onIgnore={() => setSelectedUser(null)}
        onInterested={() => alert("Interested clicked!")}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-base-100 pt-16">
      <h1 className="text-3xl font-bold text-center my-6">Connections</h1>

      <div className="flex-1 overflow-y-auto px-4 pb-32">
        <div className="max-w-3xl mx-auto space-y-4">
          {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, about, age, gender } =
              connection;

            return (
              <div
                key={_id}
                className="flex flex-col sm:flex-row items-start bg-base-200 rounded-2xl shadow-lg p-5 hover:shadow-2xl transition duration-300"
              >
                {/* Profile Image */}
                <div className="w-24 h-28 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={photoUrl || "/default-avatar.png"}
                    alt={`${firstName} ${lastName}`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Details */}
                <div className="ml-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold">
                      {firstName} {lastName}
                    </h2>
                    {(age || gender) && (
                      <p className="text-sm text-gray-500 mt-1">
                        {age ? `${age} yrs` : ""} {gender ? `| ${gender}` : ""}
                      </p>
                    )}
                    <p className="text-sm text-gray-700 mt-2">
                      {about || "No bio available."}
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-3 flex space-x-3">
                    <button
                      onClick={() => setSelectedUser(connection)}
                      className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => navigate(`/messages/${_id}`)}
                      className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700 transition"
                    >
                      Message
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connection;
