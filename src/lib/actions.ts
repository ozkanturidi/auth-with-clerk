"use server";

import { getXataClient } from "@/xata";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
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

  const user = await xataClient.db.users
    .filter({ externalId: String(userId) })
    .getMany();

  try {
    const response = await xataClient.db.posts.create({
      title: String(title),
      content: String(content),
      language: String(language),
      user: user && String(user[0].id),
    });

    if (image && response) {
      await xataClient.files.upload(
        { table: "posts", column: "image", record: response.id },
        image
      );
    }
  } catch (error) {
    console.error(error);
  }
  revalidatePath("/blogs");
  redirect("/blogs");
}
