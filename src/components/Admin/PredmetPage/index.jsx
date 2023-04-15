import {
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { url } from "../../../url";
import { styleModal } from "./stylemodal";
import styles from "./PredmetPage.module.scss";

export const PredmetPage = ({
  setSnackBarMessage,
  setOpenSnackbar,
  setOpenSnackbarError,
  t,
  currLang
}) => {
  const predmetId = useParams();
  const [predmet, setPredmet] = useState([]);
  const [classes, setClasses] = useState([]);
  const [getClasses, setGetClasses] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [classId, setClassId] = useState("");
  const [deletePredmet, setDeletePredmet] = useState(false);

  const handleModalClass = () => setModal(true);
  const handleModalClassClose = () => setModal(false);

  useEffect(() => {
    axios.get(`${url}classList?lang=${currLang}`).then((data) => {
      setGetClasses(data.data);
    });
  }, [currLang]);

  useEffect(() => {
    axios.get(`${url}predmet/${predmetId.predmetId}?lang=${currLang}`).then((data) => {
      setPredmet(data.data);
      setLoading(false);
    });
  }, [predmetId, modal, classId, currLang]);

  useEffect(() => {
    axios
      .delete(`${url}predmet/${predmetId.predmetId}/${classId}?lang=${currLang}`)
      .then((data) => {
        setSnackBarMessage(data.data.message);
        setClassId("");
        setOpenSnackbarError(true);
      })
      .catch(() => {
        setClassId("");
      });
  }, [predmetId, classId, currLang]);

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
          .put(`${url}predmet/${predmetId.predmetId}?lang=${currLang}`, {
            classes,
          })
          .then((data) => {
            setOpenSnackbar(true);
            setSnackBarMessage(data.data.message);
            setModal(false);
            if (data.data.message === "Новые классы не добавлены") {
              setOpenSnackbarError(true);
              setSnackBarMessage(data.data.message);
            }
          })
          .catch((err) => {
            setSnackBarMessage(err.response.data.message);
            setOpenSnackbarError(true);
          });
      } else {
        setSnackBarMessage("Выберите класс");
        setOpenSnackbarError(true);
      }
    } catch (err) {}
  };

  const handleDeletePredmet = async () => {
    await axios
      .delete(`${url}delete/predmet/${predmetId.predmetId}?lang=${currLang}`)
      .then((data) => {
        setDeletePredmet(true);
        setOpenSnackbarError(true);
        setSnackBarMessage(data.data.message);
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
              {t("addClass")}
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={handleDeletePredmet}
              className={styles.btnDeletePredmet}
            >
              {t("delete")} {t("subject")}
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
                    {t("delete")}
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
              <h1>{t("addClass")}</h1>
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
                  <label htmlFor="class1">
                    {data?.className} {t("className")}
                  </label>
                </div>
              ))}
            </div>
            <Button
              type="submit"
              variant="contained"
              color="success"
              className={styles.btnOk}
            >
              {t("accept")}
            </Button>
            <Button
              onClick={handleModalClassClose}
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
