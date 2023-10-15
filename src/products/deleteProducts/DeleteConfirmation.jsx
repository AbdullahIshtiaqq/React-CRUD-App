import WaitingLoader from "../../utils/WaitingLoader";
import { useMutation, useQueryClient } from "react-query";
import { deleteProduct } from "../../axios/ApiCalls";
import { KEYS } from "../../constants/Constants";
import ConfirmationModal from "../../utils/confirmationModal";
import { Dialog, DialogContent } from "@mui/material";

export default function ConfirmDeletion({ open, setOpen, id }) {
  const myClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => deleteProduct(id),
    onSuccess: () => myClient.invalidateQueries(KEYS.GET_PRODUCTS),
  });

  const handleDelete = async () => {
    await mutation.mutateAsync();
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {mutation.isLoading && (
        <Dialog open={true}>
          <DialogContent>
            <WaitingLoader text="Deleting..." />
          </DialogContent>
        </Dialog>
      )}
      {!mutation.isLoading && (
        <ConfirmationModal
          open={open}
          title="Are you sure you want to delete?"
          text="Deleting this product will delete all records related to it. You
    //             won't be able to undo the action."
          okButtonText="Delete"
          cancelButtonText="Cancel"
          handleOkClick={handleDelete}
          handleCancelClick={handleClose}
        />
      )}
    </>
  );
}
