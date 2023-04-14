import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/auth";
import { url } from "../../../url";
import styles from "./UserMe.module.scss";

export const UserAdmin = ({
  userData,
  t,
  setSnackBarMessage,
  setOpenSnackbar,
  setOpenSnackbarError,
}) => {
  const token = localStorage?.token;
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const handleSubmitChangePassword = (e) => {
    e.preventDefault();

    axios
      .post(
        `${url}auth/change-password/teacher/${userData._id}`,
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
        setSnackBarMessage(data.data.message);
        setOpenSnackbar(true);
        dispatch(logout());
        window.localStorage.removeItem("token");
      })
      .catch((err) => {
        setSnackBarMessage(err.response.data.message);
        setOpenSnackbarError(true);
      });
  };

  return (
    <div className="">
      <h1>{t("passwordChange")}</h1>
      <form onSubmit={handleSubmitChangePassword}>
        <div className="">
          <div className="">
            <p>{t("passwordOld")}: </p>
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
            <p>{t("passwordNew")}: </p>
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
          {t("passwordChange")}
        </Button>
      </form>
    </div>
  );
};
