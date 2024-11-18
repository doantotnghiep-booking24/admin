/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";


export default function ModalRestore({
    isModalRestore,
    setIsModalRestore,
  handleAction,
  description,
  confirmText,
  cancelText,
  actionId,
}) {
  const handleClose = () => {
    setIsModalRestore(false);
  };

  const handleAgree = () => {
    handleAction(actionId);
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog
        open={isModalRestore}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{cancelText || "Hủy"}</Button>
          <Button onClick={handleAgree} autoFocus>
            {confirmText || "Đồng ý"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
