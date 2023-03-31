import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { logout, logoutStudent } from "../../../redux/slices/auth";

export const HeaderStudent = ({ userData }) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (userData.fullName !== "admin") {
      const fullName = userData.fullName;
      const nameParts = fullName.split(" ");
      const firstName = nameParts[0];
      const lastNameInitial = nameParts[1].charAt(0);
      setUserName(firstName + " " + lastNameInitial + ".");
    } else {
      setUserName(userData.fullName);
    }
  }, [userData]);

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      dispatch(logoutStudent());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>Білім</div>
          </Link>
          <div className={styles.buttons}>
            <span>Здравствуйте,</span> <Link to="/me">{userName}</Link>
            <Button onClick={onClickLogout} variant="contained" color="error">
              Выйти
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
