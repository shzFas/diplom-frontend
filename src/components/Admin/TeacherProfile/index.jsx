import React, { useEffect, useState } from "react";
import styles from "./TeacherProfile.module.scss";
import userIcon from "../../../assets/userIcon.png";
import axios from "axios";
import { url } from "../../../url";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { styleModal } from "./stylemodal";

export const TeacherProfile = ({ setOpenKickTeacher }) => {
  const urlLink = useParams();
  const [teacher, setTeacher] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [permissionId, setPermissionId] = useState("");
  const [openDeletePermission, setOpenDeletePermission] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState("");
  const [modalKick, setModalKick] = useState(false);
  const [modalChangePermission, setModalChangePermission] = useState(false);
  const [predmet, setPredmet] = useState([]);
  const [checkboxPredmet, setCheckboxPredmet] = useState([]);
  const [kickTeacher, setKickTeacher] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleModalChangePermission = () => setModalChangePermission(true);
  const handleModalChangePermissionClose = () =>
    setModalChangePermission(false);

  const handleModalKick = () => setModalKick(true);
  const handleModalKickClose = () => setModalKick(false);

  const handleCloseSuccessError = () => setOpenSuccess(false);

  const handleCloseSuccessPermission = () => setOpenDeletePermission(false);

  useEffect(() => {
    axios.get(`${url}teacher/${urlLink.teacherId}`).then((data) => {
      setTeacher(data.data);
      setIsLoading(true);
    });
  }, [urlLink, openDeletePermission, openSuccess]);

  useEffect(() => {
    axios.get(`${url}predmet`).then((data) => {
      setPredmet(data.data);
    });
  }, []);

  useEffect(() => {
    axios
      .delete(`${url}teacher/${urlLink.teacherId}/${permissionId}`)
      .then((data) => {
        setDeleteStatus(data.data.message);
        setPermissionId("");
        setOpenDeletePermission(true);
      })
      .catch(() => {
        setPermissionId("");
      });
  }, [urlLink, permissionId]);

  const handleCheckboxChange = (event) => {
    const _id = event.target.id;
    const predmetName = event.target.className;
    const checked = event.target.checked;
    if (checked) {
      setCheckboxPredmet((prevClasses) => [
        ...prevClasses,
        { _id, predmetName },
      ]);
    } else {
      setCheckboxPredmet((prevClasses) =>
        prevClasses.filter((c) => c.id !== _id && c.predmetName !== predmetName)
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios
        .put(`${url}teacher/${urlLink.teacherId}`, {
          permission: checkboxPredmet,
        })
        .then(() => {
          setOpenSuccess(true);
          handleModalChangePermissionClose();
          setCheckboxPredmet([]);
        });
    } catch (err) {}
  };

  const handleKickTeacher = () => {
    axios.delete(`${url}delete/teacher/${urlLink.teacherId}`).then(() => {
      setKickTeacher(true);
      setOpenKickTeacher(true);
    });
  };

  if (kickTeacher) return <Navigate to="/teacher" />;

  return (
    <div className={styles.infoTeacherInner}>
      <div className={styles.teacherInfoItem}>
        <div className={styles.userIcon}>
          <img src={userIcon} alt="" />
        </div>
        <div className="">
          <h1>{teacher.fullName}</h1>
        </div>
      </div>
      <div className={styles.teacherInfoItemInfo}>
        <div className="">
          <h2>{teacher.email}</h2>
        </div>
      </div>
      <div className="">
        <Button
          className={styles.btnChange}
          onClick={handleModalChangePermission}
          variant="contained"
          color="success"
        >
          Добавить предметы
        </Button>
        <Button onClick={handleModalKick} variant="contained" color="error">
          Уволить
        </Button>
      </div>
      <div className="">
        <h3>Предметы: </h3>
      </div>
      <div className={styles.predmetList__inner}>
        {isLoading ? (
          <>
            {teacher.permission.map((data) => (
              <Card key={data._id} className={styles.predmetList__item}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {data.predmetName}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link
                    to={`/predmet/info/${data._id}`}
                    className="permission__text"
                  >
                    <Button size="small">Информация</Button>
                  </Link>
                  <Button
                    onClick={() => setPermissionId(data._id)}
                    color="error"
                    size="small"
                  >
                    Удалить
                  </Button>
                </CardActions>
              </Card>
            ))}
          </>
        ) : (
          <>
            <h2>Загрузка</h2>
          </>
        )}
      </div>
      <Modal
        open={modalChangePermission}
        onClose={handleModalChangePermissionClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <form onSubmit={handleSubmit}>
            <div className="">
              <h1>Добавить предметы</h1>
            </div>
            <div className={styles.gridClasses}>
              {predmet.map((data) => (
                <div>
                  <input
                    type="checkbox"
                    id={data?._id}
                    className={data?.predmetName}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="class1">{data?.predmetName}</label>
                </div>
              ))}
            </div>
            <Button
              type="submit"
              variant="contained"
              color="success"
              className={styles.btnChange}
            >
              Подтвердить
            </Button>
            <Button
              onClick={handleModalChangePermissionClose}
              variant="contained"
              color="error"
            >
              Отмена
            </Button>
          </form>
        </Box>
      </Modal>
      <Modal
        open={modalKick}
        onClose={handleModalKickClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <div className="">
            <h1>Отчислить</h1>
            <div className="">
              <Button
                className={styles.btnKick}
                onClick={handleKickTeacher}
                variant="contained"
                color="success"
              >
                Подтвердить
              </Button>
            </div>
            <div className="">
              <Button
                className={styles.btnKick}
                onClick={handleModalKickClose}
                variant="contained"
                color="error"
              >
                Отмена
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      <Snackbar
        open={openDeletePermission}
        autoHideDuration={6000}
        onClose={handleCloseSuccessPermission}
      >
        <Alert
          onClose={handleCloseSuccessPermission}
          severity="success"
          sx={{ width: "100%" }}
        >
          {deleteStatus}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccessError}
      >
        <Alert
          onClose={handleCloseSuccessError}
          severity="success"
          sx={{ width: "100%" }}
        >
          Предметы добавлены
        </Alert>
      </Snackbar>
    </div>
  );
};
