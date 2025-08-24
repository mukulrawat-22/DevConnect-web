import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addfeed } from "../utils/feedSlics";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed); // ✅ hamesha array
  const dispatch = useDispatch();

  const getfeed = async () => {
    if (feed.length > 0) {   // ✅ null check ki zarurat nahi
      return;
    }
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addfeed(res.data.data || [])); // ✅ default empty array
    } catch (err) {
      console.error("Error fetching feed data:", err);
    }
  };

  useEffect(() => {
    getfeed();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      {feed.length > 0 ? (
        <UserCard user={feed[3]} />  
      ) : (
        <p className="text-gray-500">No users found in feed</p>
      )}
    </div>
  );
};

export default Feed;
