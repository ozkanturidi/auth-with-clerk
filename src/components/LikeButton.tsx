"use client";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

const LikeButton = ({ postId }: { postId: string }) => {
  const likePostHandler = () => {};
  return <ThumbUpOutlinedIcon onClick={likePostHandler} />;
};

export default LikeButton;
