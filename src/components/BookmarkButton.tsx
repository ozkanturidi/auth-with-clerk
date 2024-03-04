"use client";
import { useEffect, useState } from "react";
import { createSavedPosts, deleteSavedPosts } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@radix-ui/themes";
import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import { SavedPost } from "@/app/blogs/types";

const BookMarkButton = ({
  postId,
  savedPosts,
}: {
  postId: string;
  savedPosts: SavedPost[];
}) => {
  const { userId, sessionId } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);

  const [isBookMarked, setIsBookMarked] = useState(
    savedPosts?.some(
      (post) => post?.post?.id === postId && userId === post?.user?.externalId
    )
  );

  const handleSaveUnSave = async () => {
    setIsUpdating(true);
    try {
      if (isBookMarked) {
        const savedPost = savedPosts.find(
          (post) =>
            post?.post?.id === postId && userId === post?.user?.externalId
        );
        await deleteSavedPosts(String(savedPost?.id));
        setIsBookMarked(false);
      } else {
        await createSavedPosts(postId);
        setIsBookMarked(true);
      }
    } catch (error) {
      console.error("Error saving post:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <Button
        style={{ cursor: "pointer" }}
        variant="outline"
        onClick={handleSaveUnSave}
        disabled={isUpdating}
        size={"1"}
      >
        {isUpdating ? (
          isBookMarked ? (
            "Unsaving..."
          ) : (
            "Saving..."
          )
        ) : isBookMarked ? (
          <>
            <BookmarkFilledIcon width="16" height="16" /> Bookmark
          </>
        ) : (
          <>
            <BookmarkIcon width="16" height="16" /> Bookmark
          </>
        )}
      </Button>
    </div>
  );
};

export default BookMarkButton;
