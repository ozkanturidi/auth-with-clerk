import { Drawer, Link } from "@mui/material";

const BlogsDrawer = ({ open, onClose, postsOfUser }: any) => {
  return (
    <Drawer
      sx={{
        width: "350px",
        listStyleType: "decimal",
        listStylePosition: "inside",
        "& .MuiDrawer-modal": {
          width: "350px",
        },
        "& .MuiPaper-root": {
          width: "300px",
        },
      }}
      anchor="right"
      open={open}
      onClose={onClose}
    >
      {postsOfUser.map((blog: any) => (
        <Link
          className="list-item border-b border-solid py-2 px-2 "
          underline="hover"
          key={blog.id}
          href={`/blogs/${blog?.id}`}
        >
          {blog?.title}
        </Link>
      ))}
    </Drawer>
  );
};

export default BlogsDrawer;
