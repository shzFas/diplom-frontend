import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../../url";
import { Alert, Button, Snackbar } from "@mui/material";
import styles from "./PredmetForm.module.scss";

export const PredmetForm = ({ t }) => {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState("");
  const [getClasses, setGetClasses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [predmetName, setPredmetName] = useState("");

  useEffect(() => {
    axios.get(`${url}classList`).then((data) => {
      setGetClasses(data.data);
    });
  }, []);

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
          .post(`${url}predmet`, {
            predmetName,
            classes,
          })
          .then(() => {
            setPredmetName("");
            setOpenSuccess(true);
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

  const handleCloseSuccessError = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSuccess(false);
    setOpenError(false);
  };

  return (
    <>
      <div className="">
        <h1>{t("predmetCreate")}</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="">
          <p>{t("predmetName")}: </p>
        </div>
        <div>
          <input
            className={styles.inputPredmet}
            type="text"
            id="predmetName"
            value={predmetName}
            onChange={(event) => setPredmetName(event.target.value)}
            required
          />
        </div>
        <div>
          <div className="">
            <p>{t("classList")}: </p>
          </div>
          <div className={styles.gridClasses}>
            {getClasses.map((data) => (
              <div>
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
        </div>
        <Button type="submit" variant="contained" color="success">
          {t("addPredmet")}
        </Button>
      </form>
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
          Предмет добавлен
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
    </>
  );
};
