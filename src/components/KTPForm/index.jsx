import { Button, MenuItem, Select, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./KTPForm.module.scss";
import MuiAlert from "@mui/material/Alert";
import { url } from "../../url";
import TableKTP from "../TableKTP";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function KTPForm({ userData }) {
  const urlLink = useParams();
  const [classes, setClasses] = useState([]);
  const [predmet, setPredmet] = useState([]);
  const [ktpTitle, setKtpTitle] = useState("");
  const [ktpDate, setKtpDate] = useState("");
  const [ktpSorSoch, setKtpSorSoch] = useState("");
  const [ktpMaxValue, setKtpMaxValue] = useState(Number);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOpenError, setAlertOpenError] = useState(false);
  const [alertOpenErrorText, setAlertOpenErrorText] = useState("");
  const [maxValue, setMaxValue] = useState(false);

  useEffect(() => {
    axios.get(`${url}classList/${urlLink.classId}`).then((data) => {
      setClasses(data.data);
    });
  }, [urlLink.classId]);

  useEffect(() => {
    axios.get(`${url}predmet/${urlLink.predmetId}`).then((data) => {
      setPredmet(data.data);
    });
  }, [urlLink.predmetId]);

  const handleInputKtpTitle = (e) => {
    setKtpTitle(e.target.value);
  };

  const handleInputKtpDate = (e) => {
    setKtpDate(e.target.value);
  };

  const handleInputKtpMaxValue = (e) => {
    setKtpMaxValue(e.target.value);
  };

  const handleInputKtpSorSoch = (e) => {
    if (e.target.value === "sor" || "soch") setMaxValue(true);
    if (e.target.value === "default") {
      setMaxValue(false);
      setKtpMaxValue(10);
    }
    setKtpSorSoch(e.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
    setAlertOpenError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post(`${url}ktp`, {
          ktpTitle: ktpTitle,
          ktpDate: ktpDate,
          ktpPredmet: urlLink.predmetId,
          ktpClass: urlLink.classId,
          ktpTeacher: userData._id,
          ktpSorSoch: ktpSorSoch,
          ktpMaxValue: ktpMaxValue,
        })
        .then((res) => {
          setAlertOpen(true);
          setKtpTitle("");
          setKtpDate("");
          setKtpSorSoch("");
        })
        .catch((err) => {
          setAlertOpenErrorText(err.response.data);
          setAlertOpenError(true);
          setKtpTitle("");
          setKtpDate("");
          setKtpSorSoch("");
          setKtpMaxValue(0);
        });
    } catch (err) {}
  };

  return (
    <>
      <div>
        <h1>Создайте план на урок:</h1>
      </div>
      <div className={styles.title}>
        <p>
          <span>{predmet.predmetName}</span> {classes.className} Класс
        </p>
      </div>
      <form onSubmit={handleSubmit} className={styles.form__inner}>
        <div className={styles.form__item}>
          <p className={styles.form__label}>Тема урока</p>
          <TextField
            type="text"
            required
            fullWidth
            onChange={handleInputKtpTitle}
            value={ktpTitle}
          />
        </div>
        <div className={styles.form__item}>
          <p className={styles.form__label}>Дата</p>
          <input
            className={styles.date_picker}
            required
            type="date"
            onChange={handleInputKtpDate}
            value={ktpDate}
          />
        </div>
        <div className={styles.form__item_sor}>
          <p className={styles.form__label}>Тип урока</p>
          <Select
            value={ktpSorSoch}
            onChange={handleInputKtpSorSoch}
            className={styles.form__switch}
          >
            <MenuItem value="sor">СОР</MenuItem>
            <MenuItem value="soch">СОЧ</MenuItem>
            <MenuItem value="default">Обычный урок</MenuItem>
          </Select>
        </div>
        {maxValue ? (
          <>
            <div className={styles.form__item}>
              <p className={styles.form__label}>Максимальный балл</p>
              <input
                className={styles.date_picker}
                required
                type="number"
                min="10"
                max="30"
                onChange={handleInputKtpMaxValue}
                value={ktpMaxValue}
              />
            </div>
          </>
        ) : (
          <></>
        )}
        <div className={styles.form__item}>
          <Button type="submit" size="large" variant="contained" fullWidth>
            Добавить тему урока
          </Button>
        </div>
      </form>
      <TableKTP urlLink={urlLink} alertOpen={alertOpen} />
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          План успешно добавлен
        </Alert>
      </Snackbar>
      <Snackbar
        open={alertOpenError}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {alertOpenErrorText.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default KTPForm;
