/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Input, Spinner } from "@nextui-org/react";
import debounce from "lodash.debounce";

import NewsFeedPostCard from "./NewsFeedPostCard";
import PostCreation from "./PostCreation";

import { getAllPost } from "@/src/actions/post/post.action";
import { IPost } from "@/types/post.types";
// import { IPost } from "@/src/types/post.types";

const NewsFeed = ({ user }: { user: any }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [category, setCategory] = useState(""); // For category filtering
  const [sortBy, setSortBy] = useState("-createdAt"); // For sorting
  const [searchTerm, setSearchTerm] = useState(""); // For searching

  // Function to fetch posts based on page number
  const fetchPosts = async (reset = false) => {
    try {
      const { posts: newPosts, totalPages: fetchedTotalPages } =
        await getAllPost({ page, category, searchTerm, sortBy } as any);

      if (reset) {
        setPosts(newPosts);
      } else {
        // Avoid adding duplicate posts
        const uniquePosts = newPosts.filter(
          (newPost: any) =>
            !posts.some((existingPost) => existingPost._id === newPost._id)
        );

        if (uniquePosts.length > 0) {
          setPosts((prevPosts) => [...prevPosts, ...uniquePosts]);
        }
      }

      setTotalPages(fetchedTotalPages); // Set the total pages

      // Disable loading more if the current page is the last one
      if (page >= fetchedTotalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setHasMore(false); // Stop infinite scroll in case of error
    }
  };
  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setSearchTerm(query); // Update search term only after debounce delay
    }, 500), // Adjust the delay (in milliseconds) as needed
    []
  );

  // Fetch posts on page load and whenever searchTerm, category, or sortBy changes
  useEffect(() => {
    setPage(1); // Reset page number to 1
    fetchPosts(true); // Fetch new posts and reset state
  }, [searchTerm, category, sortBy]);

  // Fetch more posts when scrolling
  useEffect(() => {
    if (page > 1) {
      fetchPosts();
    }
  }, [page]);

  // Function to load more posts when scrolling
  const loadMorePosts = () => {
    setPage((prevPage) => prevPage + 1); // Increment the page number
  };

  // Function to add a new post immediately to the newsfeed
  const addNewPost = (newPost: IPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // Add the new post at the top
  };

  // Function to reset filters and search
  const resetFilters = () => {
    setCategory(""); // Reset category
    setSortBy("-createdAt"); // Reset sorting to default
    setSearchTerm(""); // Reset search term
    setPage(1); // Reset page number to 1
    fetchPosts(true); // Fetch all posts
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="flex flex-col items-center justify-center mb-4">
        <PostCreation addNewPost={addNewPost} user={user} />
      </div>
      {/* Filters, search, and sorting */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4 p-4 border rounded-lg shadow-md bg-white">
        {/* Category filter */}
        <select
          className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Adventure">Adventure</option>
          <option value="Business Travel">Business Travel</option>
          <option value="Exploration">Exploration</option>
        </select>

        {/* Search input */}
        <Input
          className="rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
          placeholder="🔎 Search posts"
          value={searchTerm}
          onChange={(e) => debouncedSearch(e.target.value)}
        />

        {/* Sorting options */}
        <select
          className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="-upVotes">Popular</option>
          <option value="-createdAt">Newest</option>
        </select>

        {/* Reset button */}
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          color="primary"
          onClick={resetFilters}
        >
          Reset
        </Button>
      </div>

      <InfiniteScroll
        dataLength={posts.length} // Number of posts loaded so far
        endMessage={<p className="text-center">No more posts to show.</p>}
        hasMore={hasMore} // Whether more posts are available
        loader={
          <div className="flex justify-center">
            <Spinner />
          </div>
        }
        next={loadMorePosts} // Function to fetch the next page of posts
        style={{ overflowY: "hidden" }}
      >
        {posts.map((post: any, index) => (
          <NewsFeedPostCard
            key={index}
            post={post}
            setPosts={setPosts}
            user={user}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default NewsFeed;