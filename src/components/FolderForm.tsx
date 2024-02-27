"use client";
import React, { useRef } from "react";

const FolderForm = ({
  formCreate,
}: {
  formCreate: (formdata: FormData) => {};
}) => {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      action={(formData) => {
        formCreate(formData);
        ref.current?.reset();
      }}
    >
      <input type="text" placeholder="foldername" name="name" />
      <button type="submit">Send it</button>
    </form>
  );
};

export default FolderForm;
