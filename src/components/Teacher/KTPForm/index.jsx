import { Button, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./KTPForm.module.scss";
import { url } from "../../../url";
import { TableKTP } from "../TableKTP";

export const KTPForm = ({
  userData,
  t,
  setSnackBarMessage,
  setOpenSnackbar,
  setOpenSnackbarError,
  openSnackbar,
  openSnackbarError,
}) => {
  const urlLink = useParams();
  const [classes, setClasses] = useState([]);
  const [predmet, setPredmet] = useState([]);
  const [ktpTitle, setKtpTitle] = useState("");
  const [ktpDate, setKtpDate] = useState("");
  const [ktpSorSoch, setKtpSorSoch] = useState("");
  const [ktpPeriod, setKtpPeriod] = useState("");
  const [ktpMaxValue, setKtpMaxValue] = useState(Number);
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

  const handleInputKtpPeriod = (e) => {
    setKtpPeriod(e.target.value);
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
          ktpPeriod: ktpPeriod,
        })
        .then((res) => {
          setOpenSnackbar(true);
          setKtpTitle("");
          setKtpDate("");
          setKtpSorSoch("");
          setKtpPeriod("");
          setSnackBarMessage("План успешно добавлен");
        })
        .catch((err) => {
          setSnackBarMessage(err.response.data.message);
          setOpenSnackbarError(true);
          setKtpTitle("");
          setKtpDate("");
          setKtpSorSoch("");
          setKtpMaxValue(0);
          setKtpPeriod("");
        });
    } catch (err) {}
  };

  return (
    <>
      <div>
        <h1>{t("ktpFormTitle")}:</h1>
      </div>
      <div className={styles.title}>
        <p>
          <span>{predmet.predmetName}</span> {classes.className}{" "}
          {t("className")}
        </p>
      </div>
      <form onSubmit={handleSubmit} className={styles.form__inner}>
        <div className={styles.form__item}>
          <p className={styles.form__label}>{t("lessonTheme")}</p>
          <TextField
            type="text"
            required
            fullWidth
            onChange={handleInputKtpTitle}
            value={ktpTitle}
          />
        </div>
        <div className={styles.form__item}>
          <p className={styles.form__label}>{t("lessonDate")}</p>
          <input
            className={styles.date_picker}
            required
            type="date"
            onChange={handleInputKtpDate}
            value={ktpDate}
          />
        </div>
        <div className={styles.form__item_sor}>
          <p className={styles.form__label}>{t("lessonType")}</p>
          <Select
            value={ktpSorSoch}
            onChange={handleInputKtpSorSoch}
            className={styles.form__switch}
          >
            <MenuItem value="sor">{t("ktpSORDD")}</MenuItem>
            <MenuItem value="soch">{t("ktpSOCHDD")}</MenuItem>
            <MenuItem value="default">{t("ktpFODD")}</MenuItem>
          </Select>
        </div>
        <div className={styles.form__item_sor}>
          <p className={styles.form__label}>{t("period")}</p>
          <Select
            value={ktpPeriod}
            onChange={handleInputKtpPeriod}
            className={styles.form__switch}
          >
            <MenuItem value="1">1 {t("period")}</MenuItem>
            <MenuItem value="2">2 {t("period")}</MenuItem>
            <MenuItem value="3">3 {t("period")}</MenuItem>
            <MenuItem value="4">4 {t("period")}</MenuItem>
          </Select>
        </div>
        {maxValue ? (
          <>
            <div className={styles.form__item}>
              <p className={styles.form__label}>{t("lessonMaxValue")}</p>
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
            {t("ktpFormBtn")}
          </Button>
        </div>
      </form>
      <TableKTP
        t={t}
        urlLink={urlLink}
        setSnackBarMessage={setSnackBarMessage}
        setOpenSnackbarError={setOpenSnackbarError}
        openSnackbar={openSnackbar}
        openSnackbarError={openSnackbarError}
      />
    </>
  );
};
