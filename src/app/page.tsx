// import Blogs from "./blogs/page";
import { getPosts } from "@/lib/data";
import { Text } from "@radix-ui/themes";
import Image from "next/image";
import React, { Suspense } from "react";
import natureImage from "../../public/nature.jpg";

const Blogs = React.lazy(() => import("./blogs/page"));
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
      <Suspense
        fallback={
          <div className="flex justify-center items-center mt-6">
            Loading Blogs...
          </div>
        }
      >
        <Blogs data={data} />
      </Suspense>
    </>
  );
};

export default Home;
