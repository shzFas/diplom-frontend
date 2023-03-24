import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../../url";
import { Alert, Button, Snackbar } from "@mui/material";
import styles from "./TeacherRegisterForm.module.scss";

export const TeacherRegisterForm = () => {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState("");
  const [predmet, setPredmet] = useState([]);
  const [checkboxPredmet, setCheckboxPredmet] = useState([]);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [teacherName, setTeacherName] = useState("");

  useEffect(() => {
    axios.get(`${url}predmet`).then((data) => {
      setPredmet(data.data);
    });
  }, []);

  const handleCheckboxChange = (event) => {
    const _id = event.target.id;
    const predmetName = event.target.className;
    const checked = event.target.checked;
    if (checked) {
      setCheckboxPredmet((prevClasses) => [...prevClasses, { _id, predmetName }]);
    } else {
      setCheckboxPredmet((prevClasses) =>
        prevClasses.filter((c) => c.id !== _id && c.predmetName !== predmetName)
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (checkboxPredmet.length > 0) {
        await axios
          .post(`${url}auth/register`, {
            email: teacherEmail,
            password: teacherPassword,
            fullName: teacherName,
            permission: checkboxPredmet,
          })
          .then(() => {
            setTeacherEmail("")
            setTeacherPassword("")
            setTeacherName("")
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
        <h1>Добавьте преподавателя</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="">
          <p>Регистрация преподавателя: </p>
        </div>
        <div>
        <div className="">
            <p>Почта: </p>
          </div>
          <input
            className={styles.inputPredmet}
            type="email"
            id="teacherEmail"
            value={teacherEmail}
            onChange={(event) => setTeacherEmail(event.target.value)}
            required
          />
          <div className="">
            <p>Пароль: </p>
          </div>
          <input
            className={styles.inputPredmet}
            type="password"
            id="teacherPassword"
            value={teacherPassword}
            onChange={(event) => setTeacherPassword(event.target.value)}
            required
          />
          <div className="">
            <p>Фамилия Имя Преподавателя: </p>
          </div>
          <input
            className={styles.inputPredmet}
            type="text"
            id="teacherName"
            value={teacherName}
            onChange={(event) => setTeacherName(event.target.value)}
            required
          />
        </div>
        <div>
          <div className="">
            <p>Список Предметов для преподавателя: </p>
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
          Учитель зарегистрирован
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
