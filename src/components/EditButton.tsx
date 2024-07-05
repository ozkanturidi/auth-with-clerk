"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
// import EditDialog from "./EditDialog";
const EditDialog = dynamic(() => import("./EditDialog"), { ssr: false });
const EditButton = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const handleEditDialog = () => {
    setOpenEditDialog(true);
  };
  return (
    <>
      <button
        className="border bg-blue-500 rounded-md px-4 py-2 text-white"
        onClick={handleEditDialog}
      >
        Edit post
      </button>
      <EditDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
      />
    </>
  );
};
export default EditButton;
