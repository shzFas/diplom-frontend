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
  const [markMax, setMarkMax] = useState(Number);
  const [defaultLecture, setDefaultLecture] = useState(false);

  useEffect(() => {
    axios.get(`${url}student/${urlLink?.studentId}`).then((data) => {
      setStudent(data.data);
    });
  }, [urlLink]);

  useEffect(() => {
    if (urlLink.type === "default") {
      setDefaultLecture(true);
      setMarkMax(10);
    } else {
      setDefaultLecture(false);
      setMarkMax(Number);
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
    if (e.target.value >= 10) {
      setMark(10);
    }
    if (e.target.value < 10) {
      setMark(Number(e.target.value));
    }
    if (e.target.value === 0) {
        setStudentFalse(true);
    }
  };

  const handleMarkSorSochValue = (e) => {
    if (e.target.value >= 30) {
      setMark(30);
    }
    if (e.target.value < 30) {
      setMark(Number(e.target.value));
    }
    if (e.target.value === 0) {
        setStudentFalse(true);
    }
  };

  const handleMarkMaxValue = (e) => {
    if (e.target.value >= 30) {
      setMarkMax(30);
    }
    if (e.target.value < 30) {
      setMarkMax(Number(e.target.value));
    }
    if (e.target.value === 0) {
        setStudentFalse(true);
    }
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
          markMaxValue: markMax,
          markValue: mark,
        })
        .then((res) => {
          setAlertOpen(true);
          setMark();
          setModal(false);
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
                      max={10}
                      onChange={handleMarkValue}
                      value={mark}
                    />
                    <p>Максимальный балл за ФО: 10 баллов</p>
                  </>
                ) : (
                  <>
                    <input
                      className={styles.inputNumber}
                      id="outlined-number"
                      type="number"
                      required
                      min={1}
                      max={30}
                      onChange={handleMarkSorSochValue}
                      value={mark}
                    />
                    <p>Максимальный балл за СОР / СОЧ: 30</p>
                    <input
                      className={styles.inputNumber}
                      id="outlined-number"
                      label="Максимальный балл"
                      type="number"
                      required
                      max={30}
                      min={1}
                      onChange={handleMarkMaxValue}
                      value={markMax}
                    />
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
