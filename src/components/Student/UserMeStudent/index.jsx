import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutStudent } from "../../../redux/slices/auth";
import { url } from "../../../url";
import styles from "./UserMe.module.scss";

export const UserMeStudent = ({
  userData,
  setSnackBarMessage,
  setOpenSnackbar,
  setOpenSnackbarError,
  t,
  currLang,
}) => {
  const token = localStorage?.token;
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [nickTelegram, setNickTelegram] = useState("");
  const [telegram, setTelegram] = useState(false);

  useEffect(() => {
    if (!userData.telegram_username.trim() || !userData.telegram_id.trim()) {
      setTelegram(false);
    } else {
      setTelegram(true);
    }
  }, [userData]);

  const handleTelegramConnect = (e) => {
    e.preventDefault();

    axios
      .post(
        `${url}telegramStudent/${nickTelegram}/${userData._id}?lang=${currLang}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        setSnackBarMessage(data.data);
        setOpenSnackbar(true);
        setTelegram(true);
      })
      .catch((data) => {
        setSnackBarMessage(data.response.data)
        setOpenSnackbarError(true);
      });
  };

  const handleSubmitChangePassword = (e) => {
    e.preventDefault();

    axios
      .post(
        `${url}auth/change-password/student/${userData._id}?lang=${currLang}`,
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
        dispatch(logoutStudent());
        window.localStorage.removeItem("token");
      })
      .catch((err) => {
        setSnackBarMessage(err.response.data.message);
        setOpenSnackbarError(true);
      });
  };

  return (
    <div className="">
      <div className="">
        <h1>{t("telegramTitle")}</h1>
        <p>{t("telegramDescription")}</p>
        <a href="https://t.me/BilimEduDiplom_BOT">Telegram-бот</a>
        {telegram ? (
          <div>
            <p>Telegram: {userData.telegram_username}</p>
            <Button
              className={styles.btnChangePassword}
              type="submit"
              variant="contained"
              color="error"
              onClick={() => setTelegram(false)}
            >
              {t("cancel")}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleTelegramConnect}>
            <div className="">
              <div className="">
                <p>{t("telegramNick")}: </p>
              </div>
              <input
                className={styles.inputPassword}
                type="text"
                value={nickTelegram}
                onChange={(e) => {
                  setNickTelegram(e.target.value);
                }}
                required
              />
            </div>
            <Button
              className={styles.btnChangePassword}
              type="submit"
              variant="contained"
              color="success"
            >
              {t("telegramNickSet")}
            </Button>
            <br />
            <Button
              className={styles.btnChangePassword}
              type="submit"
              variant="contained"
              color="error"
              onClick={() => setTelegram(true)}
            >
              {t("cancel")}
            </Button>
          </form>
        )}
      </div>
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
    </div>
  );
};
