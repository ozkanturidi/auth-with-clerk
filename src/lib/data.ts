import { getXataClient } from "@/xata";
import { contains } from "@xata.io/client";

const xataClient = getXataClient();

export const getPosts = async (q: string) => {
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
    .getMany();
  return posts;
};

export const getSinglePost = async (id: string) => {
  const post = await xataClient.db.posts.read(id, ["*", "user.*"]);
  return post;
};
