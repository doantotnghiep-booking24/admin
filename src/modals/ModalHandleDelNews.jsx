/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function ModalHandleDelNews({
  isModal,
  setIsModals,
  deletedId,
  handleDeleteNews,
}) {
  const handleClose = () => {
    setIsModals(false);
  };

  const handleAgree = () => {
    handleDeleteNews(deletedId);
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog
        open={isModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có muốn xóa Bài viết này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Nhấn nhầm đó</Button>
          <Button onClick={handleAgree} autoFocus>
           Xóa luôn đi!!
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
