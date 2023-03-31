import { Alert, Button, Snackbar } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutStudent } from "../../../redux/slices/auth";
import { url } from "../../../url";
import styles from "./UserMe.module.scss";

export const UserMeStudent = ({
  userData,
  setMessagePassword,
  setOpenSuccessChangePassword,
}) => {
  const token = localStorage?.token;
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [message, setMessage] = useState("");
  const [openError, setOpenError] = useState(false);

  const handleCloseError = () => setOpenError(false);

  const handleSubmitChangePassword = (e) => {
    e.preventDefault();

    axios
      .post(
        `${url}auth/change-password/student/${userData._id}`,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        setMessagePassword(data.data.message);
        setOpenSuccessChangePassword(true);
        dispatch(logoutStudent());
        window.localStorage.removeItem("token");
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setOpenError(true);
      });
  };

  return (
    <div className="">
      <h1>Изменить пароль</h1>
      <form onSubmit={handleSubmitChangePassword}>
        <div className="">
          <div className="">
            <p>Старый пароль: </p>
          </div>
          <input
            className={styles.inputPassword}
            type="password"
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
            required
          />
        </div>
        <div className="">
          <div className="">
            <p>Новый пароль: </p>
          </div>
          <input
            className={styles.inputPassword}
            type="text"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            min="5"
            required
          />
        </div>
        <Button
          className={styles.btnChangePassword}
          type="submit"
          variant="contained"
          color="success"
        >
          Изменить пароль
        </Button>
      </form>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};