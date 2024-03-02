"use client";

import { followUser, unfollowUser } from "@/lib/actions";
import { Button } from "@radix-ui/themes";

const FollowerButton = ({
  postUser,
  followings,
}: {
  postUser: any;
  followings: any;
}) => {
  const unFollowHandler = async () => {
    await unfollowUser(postUser);
  };

  const followHandler = async () => {
    await followUser(postUser);
  };
  return followings?.some(
    (following: any) => following?.following?.id === String(postUser?.id)
  ) ? (
    <Button variant="solid" onClick={unFollowHandler}>
      Following
    </Button>
  ) : (
    <Button variant="outline" onClick={followHandler}>
      Follow
    </Button>
  );
};

export default FollowerButton;
