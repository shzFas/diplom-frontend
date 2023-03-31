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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { url } from "../../../url";
import { styleModal } from "./stylemodal";
import styles from "./PredmetPage.module.scss";

export const PredmetPage = ({ setOpenDeletePredmet }) => {
  const predmetId = useParams();
  const [predmet, setPredmet] = useState([]);
  const [classes, setClasses] = useState([]);
  const [getClasses, setGetClasses] = useState([]);
  const [modal, setModal] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [classId, setClassId] = useState("");
  const [deletePredmet, setDeletePredmet] = useState(false);

  const handleModalClass = () => setModal(true);
  const handleModalClassClose = () => setModal(false);

  const handleCloseSuccessError = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSuccess(false);
    setOpenError(false);
    setOpenDelete(false);
  };

  useEffect(() => {
    axios.get(`${url}classList`).then((data) => {
      setGetClasses(data.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${url}predmet/${predmetId.predmetId}`).then((data) => {
      setPredmet(data.data);
      setLoading(false);
    });
  }, [predmetId, modal, classId]);

  useEffect(() => {
    axios
      .delete(`${url}predmet/${predmetId.predmetId}/${classId}`)
      .then((data) => {
        setDeleteStatus(data.data.message);
        setClassId("");
        setOpenDelete(true);
      })
      .catch(() => {
        setClassId("");
      });
  }, [predmetId, classId]);

  const handleCheckboxChange = (event) => {
    const _id = event.target.id;
    const className = event.target.className;
    const checked = event.target.checked;
    if (checked) {
      setClasses((prevClasses) => [...prevClasses, { _id, className }]);
    } else {
      setClasses((prevClasses) =>
        prevClasses.filter((c) => c.id !== _id && c.className !== className)
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (classes.length > 0) {
        await axios
          .put(`${url}predmet/${predmetId.predmetId}`, {
            classes,
          })
          .then((data) => {
            setOpenSuccess(true);
            setModal(false);
            if (data.data.message === "Новые классы не добавлены") {
              setOpenError(true);
              setError(data.data.message);
            }
          })
          .catch((err) => {
            setError(err.response.data.message);
            setOpenError(true);
          });
      } else {
        setError("Выберите класс");
        setOpenError(true);
      }
    } catch (err) {}
  };

  const handleDeletePredmet = async () => {
    await axios
      .delete(`${url}delete/predmet/${predmetId.predmetId}`)
      .then(() => {
        setDeletePredmet(true);
        setOpenDeletePredmet(true);
      });
  };

  function sortClass(a, b) {
    if (a.className < b.className) {
      return -1;
    }
    if (a.className > b.className) {
      return 1;
    }
    return 0;
  }

  if (deletePredmet) return <Navigate to="/predmets" />;

  return (
    <div>
      {loading ? (
        <h1>Загрузка</h1>
      ) : (
        <>
          <div className="predmetPage__title">
            <h1>{predmet.predmetName}</h1>
          </div>
          <div className="">
            <Button
              color="success"
              variant="contained"
              onClick={handleModalClass}
            >
              Добавить класс
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={handleDeletePredmet}
              className={styles.btnDeletePredmet}
            >
              Удалить предмет
            </Button>
          </div>
          <div className={styles.predmetList__inner}>
            {predmet?.classes.sort(sortClass).map((data) => (
              <Card key={data._id} className={styles.predmetList__item}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {data.className}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => setClassId(data._id)}
                    variant="contained"
                    color="error"
                  >
                    Удалить
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
        </>
      )}
      <Modal
        open={modal}
        onClose={handleModalClassClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <form onSubmit={handleSubmit}>
            <div className="">
              <h1>Добавьте классы</h1>
            </div>
            <div className={styles.gridClasses}>
              {getClasses.map((data) => (
                <div key={data._id}>
                  <input
                    type="checkbox"
                    id={data?._id}
                    className={data?.className}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="class1">{data?.className} Класс</label>
                </div>
              ))}
            </div>
            <Button
              type="submit"
              variant="contained"
              color="success"
              className={styles.btnOk}
            >
              Подтвердить
            </Button>
            <Button
              onClick={handleModalClassClose}
              variant="contained"
              color="error"
            >
              Отмена
            </Button>
          </form>
        </Box>
      </Modal>
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
          Классы добавлены
        </Alert>
      </Snackbar>
      <Snackbar
        open={openDelete}
        autoHideDuration={6000}
        onClose={handleCloseSuccessError}
      >
        <Alert
          onClose={handleCloseSuccessError}
          severity="success"
          sx={{ width: "100%" }}
        >
          {deleteStatus}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleCloseSuccessError}
      >
        <Alert
          onClose={handleCloseSuccessError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};
