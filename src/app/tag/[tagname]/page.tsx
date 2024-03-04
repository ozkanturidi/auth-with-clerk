import CardComp from "@/components/CardComp";
import { getTagPosts } from "@/lib/data";
import { Flex } from "@radix-ui/themes";

const TagPage = async ({ params }: { params: { tagname: string } }) => {
  const tagPosts = await getTagPosts(params.tagname);

  return (
    <>
      <ul>
        <Flex
          direction={"row"}
          wrap={"wrap"}
          justify={"center"}
          align={"center"}
          gap={"5"}
        >
          {tagPosts?.map((post) => (
            <CardComp key={post?.id} post={post} />
          ))}
        </Flex>
      </ul>
    </>
  );
};

export default TagPage;
