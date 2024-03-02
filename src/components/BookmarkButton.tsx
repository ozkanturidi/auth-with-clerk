"use client";

import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { createSavedPosts, deleteSavedPosts } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@radix-ui/themes";
import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";

const BookMarkButton = ({
  postId,
  savedPosts,
}: {
  postId: string;
  savedPosts: any;
}) => {
  const { userId, sessionId } = useAuth();

  const saveHandler = async () => {
    await createSavedPosts(postId);
  };
  const unsaveHandler = async () => {
    const savedPost = savedPosts.find(
      (post: any) =>
        post?.post?.id === postId && userId === post?.user?.externalId
    );
    await deleteSavedPosts(savedPost?.id);
  };

  return savedPosts?.some(
    (post: any) =>
      post?.post?.id === postId && userId === post?.user?.externalId
  ) ? (
    <>
      <Button
        variant="outline"
        onClick={unsaveHandler}
        className="cursor-pointer"
      >
        <BookmarkFilledIcon width="16" height="16" />
        Bookmark
      </Button>
    </>
  ) : (
    <Button variant="outline" onClick={saveHandler} className="cursor-pointer">
      <BookmarkIcon width="16" height="16" />
      Bookmark
    </Button>
  );
};

export default BookMarkButton;
