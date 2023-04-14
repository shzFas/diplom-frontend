import { Box, Button, Modal } from "@mui/material";
import React from "react";
import { styleModal } from "./stylemodal";
import styles from "./ModalMarkDelete.module.scss";
import axios from "axios";
import { url } from "../../../url";

export const ModalMarkDelete = ({
  handleModalMarkDeleteClose,
  open,
  t,
  ktpId,
  studentId,
  setSnackBarMessage,
  setOpenSnackbar,
}) => {
  const handleDelete = (e) => {
    e.preventDefault();
    try {
      axios.delete(`${url}marks/${studentId}/${ktpId}`).then(() => {
        setOpenSnackbar(true);
        setSnackBarMessage("Оценка удалена");
        handleModalMarkDeleteClose();
      });
    } catch (err) {}
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleModalMarkDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <div className={styles.title}>{t("deleteMark")}</div>
          <form onSubmit={handleDelete}>
            <div className="">
              <Button
                color="error"
                size="large"
                variant="contained"
                fullWidth
                className={styles.buttonMarkForm}
                type="submit"
              >
                {t("delete")}
              </Button>
            </div>
            <div className="">
              <Button
                onClick={handleModalMarkDeleteClose}
                size="large"
                variant="contained"
                fullWidth
              >
                {t("cancel")}
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};
