import { CircularProgress } from "@mui/material";

const LoadingBlogs = () => {
  return (
    <h1 className="text-3xl flex items-center justify-center mt-6 gap-4">
      <CircularProgress />
      Loading Blog Details
    </h1>
  );
};

export default LoadingBlogs;
