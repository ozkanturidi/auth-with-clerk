import { Badge } from "@radix-ui/themes";

type BadgeProps = {
  text?: string;
};

const PostBadge = (props: BadgeProps) => {
  let color = "";

  switch (props.text) {
    case "frontend development":
      color = "orange";
      break;
    case "backend development":
      color = "blue";
      break;
    case "mobile development":
      color = "green";
      break;
    default:
      color = "gray";
  }
  return (
    <Badge variant="soft" radius="small" color={"cyan"}>
      {props.text}
    </Badge>
  );
};

export default PostBadge;
