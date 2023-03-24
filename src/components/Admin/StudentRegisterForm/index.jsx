import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../../url";
import { Alert, Button, Snackbar } from "@mui/material";
import styles from "./StudentRegisterForm.module.scss";

export const StudentRegisterForm = () => {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState("");
  const [classes, setClasses] = useState([]);
  const [checkboxClasses, setCheckboxClasses] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    axios.get(`${url}classList`).then((data) => {
      setClasses(data.data);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (checkboxClasses.length > 0) {
        await axios
          .post(`${url}auth/registerStudent`, {
            email: studentEmail,
            password: studentPassword,
            fullName: studentName,
            classId: checkboxClasses,
          })
          .then(() => {
            setStudentEmail("");
            setStudentPassword("");
            setStudentName("");
            setOpenSuccess(true);
          })
          .catch((err) => {
            console.log(err)
            setError(err.response.data[0].msg);
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
        <h1>Добавьте ученика</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="">
          <p>Регистрация Ученика: </p>
        </div>
        <div>
          <div className="">
            <p>Почта: </p>
          </div>
          <input
            className={styles.inputPredmet}
            type="email"
            id="studentEmail"
            value={studentEmail}
            onChange={(event) => setStudentEmail(event.target.value)}
            required
          />
          <div className="">
            <p>Пароль: </p>
          </div>
          <input
            className={styles.inputPredmet}
            type="password"
            id="studentPassword"
            value={studentPassword}
            onChange={(event) => setStudentPassword(event.target.value)}
            required
          />
          <div className="">
            <p>Фамилия Имя Ученика: </p>
          </div>
          <input
            className={styles.inputPredmet}
            type="text"
            id="studentName"
            value={studentName}
            onChange={(event) => setStudentName(event.target.value)}
            required
          />
        </div>
        <div>
          <div className="">
            <p>Список Классов (не больше 1): </p>
          </div>
          <div className={styles.gridClasses}>
            {classes.map((data) => (
              <div className="">
                <label>
                  <input
                    type="radio"
                    name="classId"
                    value={data._id}
                    onChange={(event) => setCheckboxClasses(event.target.value)}
                  />
                  {data.className}
                </label>
              </div>
            ))}
          </div>
        </div>
        <Button type="submit" variant="contained" color="success">
          Зарегистрировать
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
          Ученик зарегистрирован
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
