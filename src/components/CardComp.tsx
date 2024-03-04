import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import BookMarkButton from "./BookmarkButton";
import PostBadge from "./PostBadge";
import { formatDate, formatReadMin, formatText } from "@/lib/helper";
import Image from "next/image";
import { PostsRecord, UsersSavedPosts } from "@/xata";
import { getAllSavedPosts } from "@/lib/data";
export const CardComp = async ({ post }: { post: PostsRecord }) => {
  const savedPosts = await getAllSavedPosts();
  return (
    <>
      <Card
        key={post?.id}
        style={{
          maxWidth: 1000,
          width: 800,
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.)",
        }}
      >
        <Flex direction={"column"} justify={"between"}>
          <Link href={`/blogs/${post?.id}`}>
            <Flex direction={"column"} justify={"center"} gap={"3"}>
              <Flex gap="3" align="center">
                <Avatar
                  size="3"
                  src={post?.user?.imageurl ?? ""}
                  radius="full"
                  fallback="T"
                />
                <Box>
                  <Text as="div" size="2" weight="bold">
                    {`${post?.user?.firstname} ${post?.user?.lastname}`}
                  </Text>
                </Box>
                <Text weight={"light"}>
                  {formatDate(String(post?.xata?.createdAt))}
                </Text>
              </Flex>
              <Flex direction={"row"} justify={"between"}>
                <Flex direction={"column"} gap={"3"}>
                  <Text align={"left"} weight={"bold"}>
                    {post?.title}
                  </Text>
                  <Text align={"left"}>{formatText(post?.content)}</Text>
                </Flex>

                {post?.image && post?.image[0] && (
                  <Image
                    src={post?.image[0]?.url ?? ""}
                    alt="postImage"
                    width={120}
                    height={120}
                  />
                )}
              </Flex>
            </Flex>
          </Link>
          <Flex justify={"between"} mt={"4"} align={"center"}>
            <Flex gap={"2"} align={"center"}>
              {post?.tag && (
                <Link href={`/tag/${post?.tag}`}>
                  <PostBadge text={post?.tag ?? ""} />
                </Link>
              )}
              <Text size={"2"}>{formatReadMin(post?.content)}</Text>
            </Flex>
            <Flex gap={"2"}>
              <BookMarkButton
                postId={post?.id}
                savedPosts={JSON.parse(JSON.stringify(savedPosts))}
              />
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </>
  );
};

export default CardComp;
