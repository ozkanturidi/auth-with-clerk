import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
// import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { formatDate, formatImageUrl, formatReadMin } from "@/lib/helper";

import Image from "next/image";
import { getSinglePost } from "@/lib/data";
const BlogDetails = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const post = await getSinglePost(id);

  return (
    <>
      <Box pt={"4"}>
        <Flex direction={"column"} gap={"6"} align={"start"} justify={"center"}>
          <Text weight={"bold"} size={"8"}>
            {post?.title}
          </Text>
          <Flex gap="3" align="center">
            {/* <Avatar
              size="3"
              src={formatImageUrl(
                post?.attributes?.user?.data?.attributes?.profilePicture?.data
                  ?.attributes?.formats?.thumbnail?.url ?? ""
              )}
              radius="full"
              fallback="T"
            /> */}
            <Flex direction={"column"}>
              {/* <Text as="div" size="2" weight="medium">
                {`${user?.data?.attributes?.firstName} ${user?.data?.attributes?.lastName}`}
              </Text> */}

              <Flex direction={"row"} gap={"4"}>
                <Text>{formatReadMin(post?.content ?? "")}</Text>
                <Text>{formatDate(post?.xata?.createdAt)}</Text>
              </Flex>
            </Flex>
          </Flex>
          <Box className=" border-b-2 border-t-2 border-gray-100 w-full py-2 ">
            <Flex gap={"2"} align={"center"}>
              {/* <ThumbUpOutlinedIcon /> */}
              {/* <Text>{likesCount || 0}</Text> */}
            </Flex>
          </Box>
          <Text>{post?.content}</Text>
          {/* <Image
            src={formatImageUrl(
              post?.attributes?.image?.data?.attributes?.url ?? ""
            )}
            alt="PostImage"
            width={400}
            height={400}
          /> */}
        </Flex>
      </Box>
    </>
  );
};

export default BlogDetails;
