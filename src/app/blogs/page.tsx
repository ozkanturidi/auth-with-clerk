import { getTotalRecord } from "@/lib/data";
import { Box, Flex, Text } from "@radix-ui/themes";
import SearchBar from "@/components/SearchBar";
import dynamic from "next/dynamic";

import CardComp from "@/components/CardComp";
const Blogs = async ({ data }: { data: any }) => {
  const totalRecord = await getTotalRecord();
  const PaginationComp = dynamic(() => import("@/components/PaginationComp"), {
    ssr: false,
  });

  return (
    <Box style={{ marginTop: 20, marginBottom: 20 }}>
      <Flex direction={"column"} gap={"4"} align={"center"}>
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
              <CardComp key={post?.id} post={post} />
            ))}
          </Flex>
        </ul>
        <PaginationComp totalRecord={totalRecord} />
      </Flex>
    </Box>
  );
};

export default Blogs;
