import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../../url";
import { Button } from "@mui/material";
import styles from "./StudentRegisterForm.module.scss";

export const StudentRegisterForm = ({
  t,
  setSnackBarMessage,
  setOpenSnackbar,
  setOpenSnackbarError,
}) => {
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
            setOpenSnackbar(true);
            setSnackBarMessage("Ученик зарегистрирован");
          })
          .catch((err) => {
            setSnackBarMessage(err.response.data[0].msg);
            setOpenSnackbarError(true);
          });
      } else {
        setSnackBarMessage("Выберите класс");
        setOpenSnackbarError(true);
      }
    } catch (err) {}
  };

  return (
    <>
      <div className="">
        <h1>{t("addStudent")}</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="">
          <p>{t("registerStudent")}: </p>
        </div>
        <div>
          <div className="">
            <p>{t("mail")}: </p>
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
            <p>{t("password")}: </p>
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
            <p>{t("studentNameSurname")}: </p>
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
            <p>{t("classList")}: </p>
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
                  {data.className} {t("className")}
                </label>
              </div>
            ))}
          </div>
        </div>
        <Button type="submit" variant="contained" color="success">
          {t("register")}
        </Button>
      </form>
    </>
  );
};
