import Blogs from "./blogs/page";
import { getPosts } from "@/lib/data";
import natureImage from "../../public/nature.jpg";
import { Box } from "@radix-ui/themes";
import Image from "next/image";
import { Text } from "@radix-ui/themes";
const Home = async ({
  searchParams,
}: {
  searchParams?: { q?: string; page?: string };
}) => {
  const data = await getPosts(
    String(searchParams?.q ?? ""),
    String(searchParams?.page ?? "")
  );
  return (
    <>
      <div style={{ position: "relative", height: "480px" }}>
        <Image
          alt="nature"
          src={natureImage}
          layout="fill"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <Text
          style={{
            position: "relative",
            top: "50%",
            left: "40%",
            userSelect: "none",
            zIndex: 50,
          }}
          size={"8"}
          color="red"
        >
          Reach your dreams
        </Text>
      </div>
      <Blogs data={data} />;
    </>
  );
};

export default Home;
