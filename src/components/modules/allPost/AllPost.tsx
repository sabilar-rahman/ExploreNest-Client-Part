"use client";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useState, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { MdRefresh } from "react-icons/md";

import { useDebounce } from "@/src/utils/useDebounce";
import { useGetAllPostQuery } from "@/src/redux/featureApi/post/postApi";
import { TPost } from "@/src/types";
import PostCard from "../post/PostCard";
import { Avatar, Badge, useDisclosure } from "@nextui-org/react";
import CreatePost from "../../modal/CreatePost";
import { GoVerified } from "react-icons/go";
import { useGetCurrentUserQuery } from "@/src/redux/featureApi/auth/authApi";
import { useAppSelector } from "@/src/redux/hooks";
import { useCurrentUser } from "@/src/redux/featureApi/auth/authSlice";
import { toast } from "sonner";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";
import Loading from "../../Loading";

const AllPost = () => {
  const { register, watch, reset, setValue } = useForm({
    defaultValues: { search: "" },
  });
  const [category, setCategory] = useState("");

  const searchTerm = useDebounce(watch("search"));

  const { data: postData } = useGetAllPostQuery({ searchTerm, category });

  const handleReset = () => {
    reset({ search: "" });
    setCategory("");
  };

  useEffect(() => {
    setValue("search", "");
  }, [category, reset, setValue]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: user } = useGetCurrentUserQuery({});

  const CurrentUser = useAppSelector(useCurrentUser);

  const handleCreatePostClick = () => {
    if (!CurrentUser) {
      toast.warning("You need to login first!");
    } else {
      onOpen();
    }
  };

  const [hydration, setHydration] = useState(false);
  useEffect(() => {
    setHydration(true);
  }, []);
  /* If the component hasn't mounted yet,
   return null to avoid rendering mismatched content
  */
  if (!hydration) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-col items-center md:flex-row gap-4 my-6 max-w-4xl w-full mx-auto">
        <div>
          <Badge
            isOneChar
            className={`${!user?.data?.isVerified ? "hidden" : ""}`}
            content={<GoVerified />}
            placement="top-right"
            shape="circle"
            size="lg"
            color="danger"
          >
            <Avatar
              isBordered
              className="cursor-pointer"
              radius="sm"
              src={user?.data?.profileImage}
            />
          </Badge>
        </div>
        <div>
          <Button color="success" onPress={handleCreatePostClick}>
            Create Post
          </Button>

          <CreatePost isOpen={isOpen} onClose={onClose} />
        </div>

        <Input
          placeholder="Search here..."
          type="text"
          value={watch("search")}
          onChange={(e) => setValue("search", e.target.value)}
        />

        <Select
          placeholder="Select category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <SelectItem key="Adventure" value="Adventure">
            Adventure
          </SelectItem>
          <SelectItem key="Business Travel" value="Business Travel">
            Business Travel
          </SelectItem>
          <SelectItem key="Exploration" value="Exploration">
            Exploration
          </SelectItem>
          <SelectItem key="Budget Travel" value="Budget Travel">
            Budget Travel
          </SelectItem>
          <SelectItem key="Luxury Travel" value="Luxury Travel">
            Luxury Travel
          </SelectItem>
          <SelectItem key="Solo Travel" value="Solo Travel">
            Solo Travel
          </SelectItem>
          <SelectItem key="Family Travel" value="Family Travel">
            Family Travel
          </SelectItem>
          <SelectItem key="RoadTrips" value="Road Trips">
            Road Trips
          </SelectItem>
        </Select>

        <Button color="danger" onClick={handleReset}>
          Clear
        </Button>
      </div>

      <div className="flex flex-col gap-6 my-6">
        {postData?.data?.map((post: TPost) => (
          <PostCard key={post?._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default AllPost;
