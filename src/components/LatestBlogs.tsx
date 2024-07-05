"use client";

import { PostUser } from "@/app/blogs/types";
import { useState } from "react";
// import BlogsDrawer from "./BlogsDrawer";
import dynamic from "next/dynamic";

const BlogsDrawer = dynamic(() => import("./BlogsDrawer"), {
  ssr: false,
});

const LatestBlogs = ({
  postUser,
  postsOfUser,
}: {
  postUser: PostUser;
  postsOfUser: any;
}) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  return (
    <>
      <button
        type="button"
        className="border bg-blue-500 rounded-md px-4 py-2 text-white"
        onClick={handleDrawerOpen}
      >
        Latest Blogs of {postUser?.firstname}
      </button>
      <BlogsDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        postsOfUser={postsOfUser}
      />
    </>
  );
};

export default LatestBlogs;
