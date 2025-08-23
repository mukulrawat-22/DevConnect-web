import React from "react";

const UserCard = ({ user, onIgnore, onInterested }) => {
  if (!user) {
    return <div className="text-gray-500">Loading...</div>;
  }

  const { firstName, lastName, photoUrl, about, age, gender, email } = user;

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white w-96 shadow-xl rounded-2xl overflow-hidden border border-gray-200">
        {/* User Image */}
        <div className="w-full h-95">
  <img
    src={photoUrl || "/default-avatar.png"}
    alt={`${firstName || "User"} ${lastName || ""}`}
    className="w-full h-full object-cover object-[center_2%]"
  />
</div>


        {/* User Details */}
        <div className="p-5 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            {`${firstName || "Unknown"} ${lastName || ""}`}
          </h2>

          {/* Age & Gender */}
          {(age || gender) && (
            <p className="text-sm text-gray-500 mt-1">
              {age ? `${age} yrs` : ""} {gender ? `• ${gender}` : ""}
            </p>
          )}

          {/* Email */}
          {email && <p className="text-gray-600 mt-2">{email}</p>}

          {/* About */}
          {about && (
            <p className="text-gray-700 italic text-sm mt-3 line-clamp-3">
              {about}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-5">
            <button
              className="px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
              onClick={onIgnore}
            >
              Ignore
            </button>
            <button
              className="px-5 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
              onClick={onInterested}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
