import { getXataClient } from "@/xata";
import { contains } from "@xata.io/client";

const xataClient = getXataClient();

export const getPosts = async (q: string, page: string) => {
  const posts = await xataClient.db.posts
    .select(["*", "user.*"])
    .filter({
      $any: [
        { title: { $icontains: q } },
        { content: { $icontains: q } },
        { "user.firstname": { $icontains: q } },
        { "user.lastname": { $icontains: q } },
      ],
    })
    .sort("xata.createdAt", "desc")
    .getPaginated({
      pagination: { size: 10, offset: (parseInt(page) - 1) * 10 },
    });
  console.log(posts);
  return posts.records;
};

export const getSinglePost = async (id: string) => {
  const post = await xataClient.db.posts.read(id, ["*", "user.*"]);
  return post;
};

export const getTotalRecord = async () => {
  const totalRecord = await xataClient.db.posts.summarize({
    summaries: {
      total: { count: "*" },
    },
  });

  return totalRecord.summaries[0].total;
};
