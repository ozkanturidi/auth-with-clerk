"use client";

import { PostUser } from "@/app/blogs/types";
import { followUser, unfollowUser } from "@/lib/actions";
import { Followings, FollowingsRecord } from "@/xata";
import { Button } from "@radix-ui/themes";

const FollowerButton = ({
  postUser,
  followings,
}: {
  postUser: PostUser;
  followings: FollowingsRecord[];
}) => {
  const unFollowHandler = async () => {
    await unfollowUser(postUser);
  };

  const followHandler = async () => {
    await followUser(postUser);
  };
  console.log(postUser);
  return followings?.some(
    (following) => following?.following?.id === String(postUser?.id)
  ) ? (
    <Button
      style={{ cursor: "pointer" }}
      variant="solid"
      onClick={unFollowHandler}
    >
      Following
    </Button>
  ) : (
    <Button
      style={{ cursor: "pointer" }}
      variant="outline"
      onClick={followHandler}
    >
      Follow
    </Button>
  );
};

export default FollowerButton;
