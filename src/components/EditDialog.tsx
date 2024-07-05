import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
// import Swal from "sweetalert2";

const EditDialog = ({ open, onClose }: any) => {
  const editHandler = async () => {
    const Swal = (await import("sweetalert2")).default;

    Swal.fire({
      customClass: {
        container: "my-swal",
      },
      icon: "success",
      title: "Post updated successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    onClose();
  };
  return (
    <Dialog
      sx={{
        "& .MuiDialogContent-root": {
          paddingTop: "10px",
        },
      }}
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <form className="flex flex-col gap-2">
          <TextField type="text" label="Title" />
          <TextField type="text" label="Content" multiline rows={4} />
          <TextField type="file" />
          <Button onClick={editHandler} variant="contained" type="button">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
