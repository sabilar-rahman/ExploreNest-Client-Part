"use client";
import { Avatar, Button, Card, Divider } from "@nextui-org/react";
import React from "react";
import { FaCalendar, FaLocationArrow } from "react-icons/fa6";
import { GoVerified } from "react-icons/go";

// import UserPostTable from "./UserPostTable";

import { dateFormatter } from "@/src/helpers/dateFormatter";
import UserPostTable from "./UserPostTable";

const UserDashboardProfile = ({ user, posts }: { user: any; posts: any }) => {
  const formattedDate = dateFormatter(user?.data?.createdAt);

  return (
    <div className=" text-white p-6 w-full">
      <Card className="p-6 rounded-lg">
        <div className="relative">
          {/* Profile Picture */}
          <Avatar
            className="absolute -bottom-12 left-6 border-4 border-black rounded-full"
            size="lg"
            src={user?.data?.img} // Replace with actual profile image URL
          />
        </div>

        <div className="pt-14 pl-6">
          {/* User Info */}
          <div>
            <h2 className="text-xl font-semibold">
              @{user?.data?.name}
              <span className="ml-3">
                {user && user?.data?.verified ? (
                  <Button disabled color="primary" size="md" variant="bordered">
                    <GoVerified color="primary" /> Verified
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    size="md"
                    variant="bordered"
                    //   onClick={handleVerifyProfile}
                  >
                    <GoVerified color="primary" /> Get Verified
                  </Button>
                )}
              </span>
            </h2>
          </div>

          {/* Location and Joined Date */}
          <div className="flex items-center space-x-4 mt-4 text-gray-400">
            <div className="flex items-center space-x-1">
              <FaLocationArrow />
              <span>Jessore, Bangladesh</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaCalendar />
              <span>Joined {formattedDate}</span>
            </div>
          </div>

          {/* Follow and Follower Stats */}
          <div className="flex space-x-8 mt-4 justify-between items-center">
            <div className="flex gap-8">
              <p className="font-semibold">
                {user?.data?.following.length}{" "}
                <span className="text-gray-400">Following</span>
              </p>
              <p className="font-semibold">
                {user?.data?.followers.length}{" "}
                <span className="text-gray-400">Follower</span>
              </p>
            </div>
          </div>
        </div>
        <Divider className="mt-8" />
        <div className="mt-8">
          <UserPostTable posts={posts} />
        </div>
      </Card>
    </div>
  );
};

export default UserDashboardProfile;