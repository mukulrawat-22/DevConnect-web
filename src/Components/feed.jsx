import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addfeed } from "../utils/feedSlics";
import UserCard from "./UserCard";
const Feed = () => {
  const feed = useSelector((store) => store.feed);
  
  const dispatch = useDispatch();
  const getfeed = async () => {
    if (feed) {
      return;
    }
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addfeed(res.data));
    } catch (err) {
      console.error("Error fetching feed data:", err);
    }
  };
  useEffect(() => {
    getfeed();
  }, []);
  console.log("feed", feed);
  return (
    feed && (
      <div className="flex flex-col items-center justify-center">
        <UserCard user={feed.data} />
      </div>
    )
  );
};

export default Feed;
