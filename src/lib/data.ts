import { getXataClient } from "@/xata";
import { auth } from "@clerk/nextjs";

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

export const getAllSavedPosts = async () => {
  const savedPosts = await xataClient.db.users_saved_posts
    .select(["post.id", "user.externalId"])
    .getMany();

  return savedPosts;
};

export const getFollowings = async () => {
  const { userId } = auth();

  const followings = await xataClient.db.followings
    .filter({
      "user.externalId": userId,
    })
    .getMany();
  return followings;
};

export const getTagPosts = async (tag: string) => {
  const posts = await xataClient.db.posts
    .select(["*", "user.*"])
    .filter({
      tag: tag,
    })
    .sort("xata.createdAt", "desc")
    .getMany();

  return posts;
};

export const getPostsOfUser = async (userId: string) => {
  const posts = await xataClient.db.posts
    .select(["*", "user.*"])
    .filter({
      "user.externalId": userId,
    })
    .sort("xata.createdAt", "desc")
    .getMany();

  return posts;
};
