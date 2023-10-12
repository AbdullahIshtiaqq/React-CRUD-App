import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import WaitingLoader from "./waitingLoader";
import { useMutation, useQueryClient } from "react-query";
import { deleteProduct } from "../apiCalls";

export default function ConfirmDeletion({ open, setOpen, id }) {
  const myClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => deleteProduct(id),
    onSuccess: () => myClient.invalidateQueries("getProducts"),
  });

  const handleDelete = () => {
    mutation.mutateAsync().then(() => handleClose());
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {mutation.isLoading && <WaitingLoader text="Deleting... " />}
        {!mutation.isLoading && (
          <>
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to delete?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Deleting this product will delete all records related to it. You
                won't be able to undo the action.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cacnel</Button>
              <Button onClick={handleDelete} autoFocus>
                Delete
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
