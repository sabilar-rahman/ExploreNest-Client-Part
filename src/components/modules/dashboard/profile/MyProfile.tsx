"use client";


import { useGetCurrentUserQuery } from "@/src/redux/featureApi/auth/authApi";
import authCurrentUser from "@/src/redux/featureApi/auth/authCurrentUser";
import Link from "next/link";

const MyProfile = () => {
  // const { user } = authCurrentUser();

  const {data } = useGetCurrentUserQuery({})



  return (
    <div className="profile-container max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md mt-8">
      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <img
          src={data?.data?.img || "/default-profile.png"} // Fallback to default image if no profile image exists
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-blue-500"
        />
      </div>

      {/* User Information */}
      <h2 className="text-center text-2xl font-semibold mb-2">{data?.data?.name}</h2>
      <h2 className="text-center text-2xl font-semibold mb-2">{data?.data?.email}</h2>
      <p className="text-center text-gray-500 mb-4">
        Role: {data?.data?.role || "User"}
      </p>

      {/* Followers and Following */}
      <div className="flex justify-around text-center mb-4">
        <div>
          <span className="text-xl font-bold">{data?.data?.followers || 0}</span>
          <p className="text-gray-500">Followers</p>
        </div>

        <div>
          <span className="text-xl font-bold">{data?.data?.following || 0}</span>
          <p className="text-gray-500">Following</p>
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="text-center">
      <Link href={`/dashboard/edit-profile`}>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
          Edit Profile
        </button>
        </Link>
      </div>
    </div>
  );
};

export default MyProfile;
