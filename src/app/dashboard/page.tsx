import FolderForm from "@/components/FolderForm";
import { getXataClient } from "@/xata";
import { auth, useUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";
import { z } from "zod";
const schema = z.object({ name: z.string().min(5), userId: z.string() });
const Dashboard = async () => {
  const { userId } = auth();
  const xataClient = getXataClient();
  if (!userId) {
    redirect("/");
  }
  const folders = await xataClient.db.folders.filter({ userId }).getMany();

  async function formCreate(formData: FormData) {
    "use server";
    const parsedForm = schema.parse({
      name: formData.get("name"),
      userId,
    });
    const xataClient = getXataClient();
    await xataClient.db.folders.create(parsedForm);
    revalidatePath("/dashboard");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <FolderForm formCreate={formCreate} />
      <ul>
        {folders.map((folder) => (
          <li key={folder.id}>{folder.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
