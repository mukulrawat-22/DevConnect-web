import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { toast } from "react-toastify";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  // Handle Accept/Reject (mock example)
  const handleRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(_id));
      if (res.status === 200) {
        toast.success(`Request ${status} successfully!`);
      // refresh list after action
      } else {
        toast.warn(`Unexpected response while processing request.`);
      }
    } catch (err) {
      console.error(`Failed to ${status} request:`, err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.error("Fetching requests failed:", err);
    }
  };


  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests)
    return <h1 className="text-center mt-10">Loading requests...</h1>;
  if (requests.length === 0)
    return <h1 className="text-center mt-10">No requests found.</h1>;

  return (
    <div className="flex flex-col items-center my-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Connection Requests</h1>
      <div className="w-full max-w-3xl space-y-4">
        {requests.map((request, index) => {
          const { _id, fromUserId } = request;
          const { firstName, lastName, photoUrl, about, age, gender } =
            fromUserId || {};

          return (
            <div
              key={_id || index}
              className="flex items-center bg-base-200 rounded-xl shadow p-4 hover:shadow-md transition "
            >
              {/* Profile Image */}
              <div className="w-20 h-20 object-cover object-top rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={photoUrl || "/default-avatar.png"}
                  alt={`${firstName} ${lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="ml-4 flex-1 text-left">
                <h2 className="text-lg font-semibold">
                  {firstName} {lastName}
                </h2>
                <p className="text-sm text-gray-300 mt-1">
                  {about || "No bio available."}
                </p>

                {/* Accept/Reject Buttons */}
                <div className="mt-3 flex space-x-2">
                  <button
                    onClick={() => handleRequest("accepted", _id)}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRequest("rejected", _id)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
