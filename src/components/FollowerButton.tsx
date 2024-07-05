"use client";

import { PostUser } from "@/app/blogs/types";
import { followUser, unfollowUser } from "@/lib/actions";
import { FollowingsRecord } from "@/xata";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@radix-ui/themes";
import { useState } from "react";

const FollowerButton = ({
  postUser,
  followings,
}: {
  postUser: PostUser;
  followings: FollowingsRecord[];
}) => {
  const { userId } = useAuth();
  const [isFollowing, setIsFollowing] = useState(
    followings?.some(
      (following) => following?.following?.id === String(postUser.id)
    )
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const handleFollowUnfollow = async () => {
    setIsUpdating(true);
    try {
      if (isFollowing) {
        await unfollowUser(postUser);
        setIsFollowing(false);
      } else {
        await followUser(postUser);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <div>
      {postUser?.externalId !== userId && (
        <Button
          style={{ cursor: "pointer" }}
          variant={isFollowing ? "solid" : "outline"}
          onClick={handleFollowUnfollow}
          disabled={isUpdating}
          size={"1"}
        >
          {isUpdating
            ? isFollowing
              ? "Unfollowing..."
              : "Following..."
            : isFollowing
            ? "Following"
            : "Follow"}
        </Button>
      )}
    </div>
  );
};

export default FollowerButton;
