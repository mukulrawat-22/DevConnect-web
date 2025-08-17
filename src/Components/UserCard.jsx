import React from "react";

const UserCard = ({ user }) => {
  if (!user) {
    return <div>Loading...</div>;
  }

  const { firstName, lastName, photoUrl, about, age, gender, email } = user;

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="card bg-base-300 w-96 shadow-xl rounded-2xl overflow-hidden">
        {/* User Image */}
        <figure className="px-6 pt-6 flex justify-center">
          <img
            src={photoUrl || "/default-avatar.png"}
            alt={`${firstName || "User"} ${lastName || ""}`}
            className="rounded-2xl w-full h-60 object-contain object-center bg-base-200"
          />
        </figure>

        {/* User Details */}
        <div className="card-body items-center text-center">
          <h2 className="card-title text-xl font-bold">
            {`${firstName || "Unknown"} ${lastName || ""}`}
          </h2>

          {/* Age & Gender */}
          {(age || gender) && (
            <p className="text-sm text-gray-500">
              {age ? `${age} years old` : ""}{" "}
              {gender ? `| ${gender}` : ""}
            </p>
          )}

          {/* Email */}
          {email && <p className="text-gray-600">{email}</p>}

          {/* About */}
          {about && (
            <p className="italic text-gray-700">{about}</p>
          )}

          {/* Action Buttons */}
          <div className="card-actions mt-4 flex gap-3">
            <button className="btn btn-error rounded-xl px-6">Ignore</button>
            <button className="btn btn-success rounded-xl px-6">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
