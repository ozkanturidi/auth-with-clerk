"use server";

import { getXataClient } from "@/xata";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function createBlog(
  currentState: any,
  formData: FormData
) {
  const { userId } = auth();
  const xataClient = getXataClient();
  const title = formData.get("title");
  const content = formData.get("content");
  const language = formData.get("language");
  const image = formData.get("image");
  const tag = formData.get("tag");

  const user = await xataClient.db.users
    .filter({ externalId: String(userId) })
    .getMany();

  try {
    const response = await xataClient.db.posts.create({
      title: String(title),
      content: String(content),
      language: String(language),
      user: user && String(user[0]?.id),
      tag: String(tag),
    });
    if (image && response) {
      await xataClient.files.upload(
        { table: "posts", column: "image", record: String(response?.id) },
        image
      );
    }
  } catch (error) {
    console.error(error);
  }
  revalidatePath("/blogs");
  redirect("/blogs");
}

export const createSavedPosts = async (postId: string) => {
  const { userId } = auth();
  const xataClient = getXataClient();
  const user = await xataClient.db.users
    .filter({ externalId: String(userId) })
    .getMany();
  try {
    await xataClient.db.users_saved_posts.create({
      user: user && String(user[0]?.id),
      post: postId,
    });
    revalidatePath("/blogs");
  } catch (error) {
    console.error(error);
  }
};

export const deleteSavedPosts = async (postId: string) => {
  const xataClient = getXataClient();
  try {
    await xataClient.db.users_saved_posts.delete(postId);
    revalidatePath("/blogs");
  } catch (error) {
    console.error(error);
  }
};

export const followUser = async (followingUser: string) => {
  const { userId } = auth();
  const xataClient = getXataClient();
  const user = await xataClient.db.users
    .filter({ externalId: String(userId) })
    .getMany();

  try {
    await xataClient.db.followings.create({
      user: user && String(user[0]?.id),
      following: String(followingUser?.id),
    });
    revalidatePath("/blogs");
  } catch (error) {
    console.error(error);
  }
};

export const unfollowUser = async (followingUser: string) => {
  const { userId } = auth();
  const xataClient = getXataClient();
  try {
    const followings = await xataClient.db.followings
      .filter({
        "user.externalId": String(userId),
        following: String(followingUser?.id),
      })
      .getMany();
    await xataClient.db.followings.delete(followings[0]?.id);
    revalidatePath("/blogs");
  } catch (error) {
    console.error(error);
  }
};
