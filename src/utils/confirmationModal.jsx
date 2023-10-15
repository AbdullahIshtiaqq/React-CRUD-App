import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ConfirmationModal({
  open,
  title,
  text,
  okButtonText,
  cancelButtonText,
  handleOkClick,
  handleCancelClick,
}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCancelClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClick} autoFocus>
            {cancelButtonText}
          </Button>
          <Button onClick={handleOkClick}>{okButtonText}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
