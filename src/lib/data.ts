import { getXataClient } from "@/xata";

const xataClient = getXataClient();

export const getPosts = async () => {
  const posts = await xataClient.db.posts.getMany();
  return posts;
};

export const getSinglePost = async (id: string) => {
  const post = await xataClient.db.posts.read(id);
  return post;
};
