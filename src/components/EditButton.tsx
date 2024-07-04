"use client";

import { Button } from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";
// import EditDialog from "./EditDialog";
const EditDialog = dynamic(() => import("./EditDialog"), { ssr: false });
const EditButton = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  return (
    <>
      <Button onClick={() => setOpenEditDialog(true)} color="primary">
        Edit post
      </Button>
      <EditDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
      />
    </>
  );
};
export default EditButton;
