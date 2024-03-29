import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { url } from "../../../url";
import userIcon from "../../../assets/userIcon.png";
import styles from "./StudentProfile.module.scss";
import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { styleModal } from "./stylemodal";

export const StudentProfile = ({
  setSnackBarMessage,
  setOpenSnackbar,
  setOpenSnackbarError,
  t,
  currLang,
}) => {
  const urlLink = useParams();
  const [studentInfo, setStudentInfo] = useState([]);
  const [classes, setClasses] = useState([]);
  const [checkboxClasses, setCheckboxClasses] = useState("");
  const [className, setClassName] = useState([]);
  const [modalChangeClass, setModalChangeClass] = useState(false);
  const [modalKick, setModalKick] = useState(false);
  const [kickStudent, setKickStudent] = useState(false);
  const [changeClassStudent, setChangeClassStudent] = useState(false);

  const handleModalChangeClass = () => setModalChangeClass(true);
  const handleModalChangeClassClose = () => setModalChangeClass(false);

  const handleModalKick = () => setModalKick(true);
  const handleModalKickClose = () => setModalKick(false);

  useEffect(() => {
    axios.get(`${url}classList?lang=${currLang}`).then((data) => {
      setClasses(data.data);
    });
  }, [currLang]);

  useEffect(() => {
    axios
      .get(`${url}student/${urlLink.studentId}?lang=${currLang}`)
      .then((data) => {
        setStudentInfo(data.data);
      });
  }, [urlLink, currLang]);

  useEffect(() => {
    axios
      .get(`${url}classList/${studentInfo.classId}?lang=${currLang}`)
      .then((data) => {
        setClassName(data.data);
      });
  }, [studentInfo.classId, currLang]);

  const handleKickStudent = () => {
    axios
      .delete(`${url}student/${urlLink.studentId}?lang=${currLang}`)
      .then((data) => {
        setKickStudent(true);
        setOpenSnackbarError(true);
        setSnackBarMessage(data.data.message);
      });
  };

  const handleSubmitClass = (event) => {
    event.preventDefault();
    axios
      .put(`${url}student/changeClass/${urlLink.studentId}?lang=${currLang}`, {
        classId: checkboxClasses,
      })
      .then((data) => {
        setChangeClassStudent(true);
        setOpenSnackbar(true);
        setSnackBarMessage(data.data.message);
      });
  };

  if (kickStudent) return <Navigate to={`/student/${studentInfo.classId}`} />;
  if (changeClassStudent) return <Navigate to="/student" />;

  return (
    <div className={styles.infoStudentInner}>
      <div className={styles.studentInfoItem}>
        <div className={styles.userIcon}>
          <img src={userIcon} alt="" />
        </div>
        <div className="">
          <h1>{studentInfo.fullName}</h1>
        </div>
      </div>
      <div className={styles.studentInfoItemInfo}>
        <div className="">
          <h2>
            {className.className} {t("className")}
          </h2>
        </div>
        <div className="">
          <h2>{studentInfo.email}</h2>
        </div>
      </div>
      <div className="">
        <Button
          className={styles.btnChange}
          onClick={handleModalChangeClass}
          variant="contained"
          color="success"
        >
          {t("changeClass")}
        </Button>
        <Button onClick={handleModalKick} variant="contained" color="error">
          {t("kickStudent")}
        </Button>
      </div>
      <Modal
        open={modalKick}
        onClose={handleModalKickClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <div className="">
            <h1>{t("kickStudent")}</h1>
            <div className="">
              <Button
                className={styles.btnKick}
                onClick={handleKickStudent}
                variant="contained"
                color="success"
              >
                {t("accept")}
              </Button>
            </div>
            <div className="">
              <Button
                className={styles.btnKick}
                onClick={handleModalKickClose}
                variant="contained"
                color="error"
              >
                {t("cancel")}
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      <Modal
        open={modalChangeClass}
        onClose={handleModalChangeClassClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <form onSubmit={handleSubmitClass}>
            <div className="">
              <h1>{t("changeClass")}</h1>
            </div>
            <div className={styles.gridClasses}>
              {classes.map((data) => (
                <div className="">
                  <label>
                    <input
                      type="radio"
                      name="classId"
                      value={data._id}
                      onChange={(event) =>
                        setCheckboxClasses(event.target.value)
                      }
                    />
                    {data.className}
                  </label>
                </div>
              ))}
            </div>
            <Button
              type="submit"
              variant="contained"
              color="success"
              className={styles.btnChange}
            >
              {t("accept")}
            </Button>
            <Button
              onClick={handleModalChangeClassClose}
              variant="contained"
              color="error"
            >
              {t("cancel")}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
