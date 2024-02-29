import { Button } from "@radix-ui/themes";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const data = useFormStatus();
  return (
    <Button type="submit" disabled={data.pending}>
      Submit
    </Button>
  );
};

export default SubmitButton;
