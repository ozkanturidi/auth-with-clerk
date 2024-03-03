"use client";
import { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);

  const saveHandler = async () => {
    setLoading(true);
    try {
      await createSavedPosts(postId);
    } catch (error) {
      console.error("Error saving post:", error);
    } finally {
      setLoading(false);
    }
  };

  const unsaveHandler = async () => {
    setLoading(true);
    try {
      const savedPost = savedPosts.find(
        (post: any) =>
          post?.post?.id === postId && userId === post?.user?.externalId
      );
      await deleteSavedPosts(savedPost?.id);
    } catch (error) {
      console.error("Error deleting saved post:", error);
    } finally {
      setLoading(false);
    }
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
        disabled={loading}
      >
        {loading ? (
          "Loading..."
        ) : (
          <>
            <BookmarkFilledIcon width="16" height="16" />
            Bookmark
          </>
        )}
      </Button>
    </>
  ) : (
    <Button
      variant="outline"
      onClick={saveHandler}
      className="cursor-pointer"
      disabled={loading}
    >
      {loading ? (
        "Loading..."
      ) : (
        <>
          <BookmarkIcon width="16" height="16" />
          Bookmark
        </>
      )}
    </Button>
  );
};

export default BookMarkButton;
