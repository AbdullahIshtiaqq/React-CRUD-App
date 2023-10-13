import ConfirmDeletion from "../deleteProducts/DeleteConfirmation";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function DeleteProduct({ id }) {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const handleDelete = () => {
    setConfirmationOpen(true);
  };
  return (
    <>
      <Button size="small" onClick={handleDelete}>
        Delete
      </Button>
      {confirmationOpen && (
        <ConfirmDeletion
          open={confirmationOpen}
          setOpen={setConfirmationOpen}
          id={id}
        />
      )}
    </>
  );
}
