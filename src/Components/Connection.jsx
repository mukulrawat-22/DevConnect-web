import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connection = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  // ✅ Fetch connections
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // ✅ Loading state
  if (!connections) {
    return <h1 className="text-center mt-10">Loading connections...</h1>;
  }

  // ✅ Empty state
  if (connections.length === 0) {
    return <h1 className="text-center mt-10">No connections found.</h1>;
  }

  // ✅ Render connections
  return (
    <div className="flex flex-col items-center my-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Connections</h1>

      <div className="w-full max-w-3xl space-y-4">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, about, age, gender } =
            connection;

          return (
            <div
              key={_id}
              className="flex items-center bg-base-200 rounded-xl shadow p-4 hover:shadow-md transition"
            >
              {/* Profile Image */}
              <div className="w-20 h-24 object-fit rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={photoUrl || "/default-avatar.png"}
                  alt={`${firstName} ${lastName}`}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Details */}
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-semibold">
                  {firstName} {lastName}
                </h2>
                {/* Age & Gender */}
                {(age || gender) && (
                  <p className="text-sm text-gray-500">
                    {age ? `${age} yrs` : ""} {gender ? `| ${gender}` : ""}
                  </p>
                )}
                {/* About */}
                <p className="text-sm text-gray-700 mt-1">
                  {about || "No bio available."}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connection;
