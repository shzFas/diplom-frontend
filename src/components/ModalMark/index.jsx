import {
  Alert,
  Box,
  Button,
  Checkbox,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styleModal } from "./stylemodal";
import { url } from "../../url";
import styles from "./ModalMark.module.scss";

function ModalMark({ handleModalMarkClose, open, setModal }) {
  const urlLink = useParams();
  const [student, setStudent] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertErrorOpen, setAlertErrorOpen] = useState(false);
  const [studentFalse, setStudentFalse] = useState(false);
  const [mark, setMark] = useState(Number);
  const [defaultLecture, setDefaultLecture] = useState(false);

  useEffect(() => {
    axios.get(`${url}student/${urlLink?.studentId}`).then((data) => {
      setStudent(data?.data);
    });
  }, [urlLink]);

  useEffect(() => {
    if (urlLink.type === "default") {
      setDefaultLecture(true);
    } else {
      setDefaultLecture(false);
    }
  }, [urlLink]);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
    setAlertErrorOpen(false);
  };

  const handleInputStudentFalse = (e) => {
    if (e.target.checked === true) {
      setStudentFalse(true);
      setMark(0);
    }
    if (e.target.checked === false) {
      setStudentFalse(false);
    }
  };

  const handleMarkValue = (e) => {
    setMark(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post(`${url}marks`, {
          markTeacher: urlLink.teacherId,
          markPredmet: urlLink.id,
          markStudent: urlLink.studentId,
          markClassStudent: urlLink.classId,
          markDate: urlLink.ktpId,
          markFalse: studentFalse,
          markMaxValue: urlLink.max,
          markValue: mark,
          markSochSor: urlLink.type,
        })
        .then((res) => {
          setAlertOpen(true);
          setMark();
          setModal(false);
          setStudentFalse(false);
        })
        .catch(() => {
          setAlertErrorOpen(true);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleModalMarkClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h3>{student.fullName}</h3>
          </Typography>
          <form onSubmit={handleSubmit}>
            {studentFalse ? (
              <></>
            ) : (
              <>
                {defaultLecture ? (
                  <>
                    <input
                      className={styles.inputNumber}
                      id="outlined-number"
                      type="number"
                      required
                      min={1}
                      max={urlLink.max}
                      onChange={handleMarkValue}
                      value={mark}
                    />
                    <p>Максимальный балл за ФО: {urlLink.max} баллов</p>
                  </>
                ) : (
                  <>
                    <input
                      className={styles.inputNumber}
                      id="outlined-number"
                      type="number"
                      required
                      min={1}
                      max={urlLink.max}
                      onChange={handleMarkValue}
                      value={mark}
                    />
                    <p>Максимальный балл за СОР / СОЧ: {urlLink.max}</p>
                  </>
                )}
              </>
            )}
            <div className="">
              Ученик отсутствовал
              <Checkbox
                value={studentFalse}
                onChange={handleInputStudentFalse}
              />
            </div>
            <div className="">
              <Button
                className={styles.buttonMarkForm}
                type="submit"
                color="success"
                size="large"
                variant="contained"
                fullWidth
              >
                Поставить оценку
              </Button>
            </div>
            <div className="">
              <Button
                color="error"
                onClick={handleModalMarkClose}
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
          Оценка выставлена
        </Alert>
      </Snackbar>
      <Snackbar
        open={alertErrorOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="error"
          sx={{ width: "100%" }}
        >
          Ошибка
        </Alert>
      </Snackbar>
    </>
  );
}

export default ModalMark;
