"use client";

import { PostUser } from "@/app/blogs/types";
import { Button } from "@mui/material";
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

  return (
    <>
      <Button
        type="button"
        onClick={(e) => {
          setOpenDrawer(true);
        }}
        variant="contained"
      >
        Latest Blogs of {postUser?.firstname}
      </Button>
      <BlogsDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        postsOfUser={postsOfUser}
      />
    </>
  );
};

export default LatestBlogs;
