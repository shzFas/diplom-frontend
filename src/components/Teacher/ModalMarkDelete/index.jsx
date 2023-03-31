import { Alert, Box, Button, Modal, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { styleModal } from "./stylemodal";
import styles from "./ModalMarkDelete.module.scss";
import axios from "axios";
import { url } from "../../../url";

export const ModalMarkDelete = ({ handleModalMarkDeleteClose, open }) => {
  const urlLink = useParams();
  const [alertOpen, setAlertOpen] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    try {
      axios
        .delete(`${url}marks/${urlLink.idStudent}/${urlLink.idKtp}`)
        .then(() => {
          setAlertOpen(true);
          handleModalMarkDeleteClose();
        });
    } catch (err) {}
  };

  const handleCloseAlert = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
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
          <div className={styles.title}>Удалить оценку</div>
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
                Удалить
              </Button>
            </div>
            <div className="">
              <Button
                onClick={handleModalMarkDeleteClose}
                size="large"
                variant="contained"
                fullWidth
              >
                Отмена
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          Оценка удалена
        </Alert>
      </Snackbar>
    </>
  );
};
