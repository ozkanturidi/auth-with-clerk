import { formatDate, formatReadMin, formatText } from "@/lib/helper";
import Link from "next/link";
import {
  getAllSavedPosts,
  getFollowings,
  getPosts,
  getTotalRecord,
} from "@/lib/data";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import PostBadge from "@/components/PostBadge";
import PaginationComp from "@/components/PaginationComp";
import BookMarkButton from "@/components/BookmarkButton";
import FollowerButton from "@/components/FollowerButton";
import { auth } from "@clerk/nextjs";
const Blogs = async ({
  searchParams,
}: {
  searchParams?: { q?: string; page?: string };
}) => {
  const totalRecord = await getTotalRecord();
  const { userId } = auth();
  const data = await getPosts(
    String(searchParams?.q ?? ""),
    String(searchParams?.page ?? "")
  );
  const savedPosts = await getAllSavedPosts();
  const followings = await getFollowings();
  return (
    <Box style={{ marginTop: 20, marginBottom: 20 }}>
      <Flex direction={"column"} gap={"4"} align={"center"}>
        <Text weight={"bold"} size={"6"}>
          WELCOME TO THE BLOGS PAGE
        </Text>
        <SearchBar />
        <ul>
          <Flex
            direction={"row"}
            wrap={"wrap"}
            justify={"center"}
            align={"center"}
            gap={"5"}
          >
            {data?.map((post) => (
              <Card
                key={post?.id}
                style={{
                  maxWidth: 1000,
                  width: 800,
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
                        <Text>{formatDate(post?.xata?.createdAt)}</Text>
                      </Flex>
                      <Flex direction={"row"} justify={"between"}>
                        <Flex direction={"column"} gap={"3"}>
                          <Text align={"left"} weight={"bold"}>
                            {post?.title}
                          </Text>
                          <Text align={"left"}>
                            {formatText(post?.content)}
                          </Text>
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
                    <Flex gap={"2"}>
                      {post?.tag && <PostBadge text={post?.tag ?? ""} />}
                      <Text>{formatReadMin(post?.content)}</Text>
                    </Flex>
                    <Flex gap={"2"}>
                      <BookMarkButton
                        postId={post?.id}
                        savedPosts={JSON.parse(JSON.stringify(savedPosts))}
                      />
                      {post?.user?.externalId !== userId && (
                        <FollowerButton
                          followings={JSON.parse(JSON.stringify(followings))}
                          postUser={post?.user}
                        />
                      )}
                    </Flex>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Flex>
        </ul>
        <PaginationComp totalRecord={totalRecord} />
      </Flex>
    </Box>
  );
};

export default Blogs;
