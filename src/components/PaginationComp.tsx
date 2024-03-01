"use client";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationTypes {
  totalRecord: number;
}

const PaginationComp = ({ totalRecord }: PaginationTypes) => {
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    if (page) {
      params.set("page", String(value));
    } else {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <>
      <Stack spacing={2}>
        <Typography>Page: {page}</Typography>
        <Pagination
          count={Math.ceil(totalRecord / 10)}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </>
  );
};

export default PaginationComp;
