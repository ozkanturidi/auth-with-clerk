// import Blogs from "./blogs/page";
import { getPosts } from "@/lib/data";
import { CircularProgress } from "@mui/material";
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
      </div>
      <Suspense
        fallback={
          <div className="flex justify-center gap-2 items-center mt-6">
            <CircularProgress />
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
