import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import { formatDate, formatImageUrl, formatReadMin } from "@/lib/helper";

import Image from "next/image";
import { getFollowings, getSinglePost } from "@/lib/data";
import LikeButton from "@/components/LikeButton";
import FollowerButton from "@/components/FollowerButton";
const BlogDetails = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const post = await getSinglePost(id);
  const followings = await getFollowings();

  return (
    <>
      <Box pt={"4"}>
        <Flex direction={"column"} gap={"6"} align={"start"} justify={"center"}>
          <Text weight={"bold"} size={"8"}>
            {post?.title}
          </Text>
          <Flex gap="3" align="center">
            <Avatar
              size="3"
              src={post?.user?.imageurl ?? ""}
              radius="full"
              fallback="T"
            />
            <Flex direction={"column"}>
              <Flex gap={"2"} align={"center"}>
                <Text as="div" size="2" weight="medium">
                  {`${post?.user?.firstname} ${post?.user?.lastname}`}
                </Text>
                <FollowerButton
                  followings={JSON.parse(JSON.stringify(followings))}
                  postUser={JSON.parse(JSON.stringify(post?.user))}
                />
              </Flex>
              <Flex direction={"row"} gap={"4"}>
                <Text>{formatReadMin(post?.content ?? "")}</Text>
                <Text>{formatDate(String(post?.xata?.createdAt))}</Text>
              </Flex>
            </Flex>
          </Flex>
          <Box className=" border-b-2 border-t-2 border-gray-100 w-full py-2 ">
            <Flex gap={"2"} align={"center"}>
              <LikeButton postId={String(post?.id)} />
              <Text>{post?.likesCount || 0}</Text>
            </Flex>
          </Box>

          {post?.image && post?.image[0] && (
            <Image
              src={post?.image[0]?.url ?? ""}
              alt="PostImage"
              width={800}
              height={800}
            />
          )}
          <Text>{post?.content}</Text>
        </Flex>
      </Box>
    </>
  );
};

export default BlogDetails;
