import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../../url";
import { Button } from "@mui/material";
import styles from "./TeacherRegisterForm.module.scss";

export const TeacherRegisterForm = ({
  t,
  setSnackBarMessage,
  setOpenSnackbar,
  setOpenSnackbarError,
  currLang
}) => {
  const [predmet, setPredmet] = useState([]);
  const [checkboxPredmet, setCheckboxPredmet] = useState([]);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [teacherName, setTeacherName] = useState("");

  useEffect(() => {
    axios.get(`${url}predmet?lang=${currLang}`).then((data) => {
      setPredmet(data.data);
    });
  }, [currLang]);

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
      if (checkboxPredmet.length > 0) {
        await axios
          .post(`${url}auth/register?lang=${currLang}`, {
            email: teacherEmail,
            password: teacherPassword,
            fullName: teacherName,
            permission: checkboxPredmet,
          })
          .then(() => {
            setTeacherEmail("");
            setTeacherPassword("");
            setTeacherName("");
            setOpenSnackbar(true);
            setSnackBarMessage(t("registered"));
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
        <h1>{t("addTeacher")}</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="">
          <p>{t("registerTeacher")}: </p>
        </div>
        <div>
          <div className="">
            <p>{t("mail")}: </p>
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
            <p>{t("password")}: </p>
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
            <p>{t("teacherNameSurname")}: </p>
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
            <p>{t("predmetListTitle")}: </p>
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
          {t("register")}
        </Button>
      </form>
    </>
  );
};
