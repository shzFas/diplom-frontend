import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./JournalPeriod.module.scss";

function JournalPeriod() {
  return (
    <>
      <div className="predmetClass__title">
        <h1>Список классов:</h1>
      </div>
      <div>
        <p>Четверть</p>
        <div className={styles.buttonLink}>
          <Link to="1" className={styles.predmetList__btn}>
            <Button variant="contained">1 четверть</Button>
          </Link>
          <Link to="2" className={styles.predmetList__btn}>
            <Button variant="contained">2 четверть</Button>
          </Link>
          <Link to="3" className={styles.predmetList__btn}>
            <Button variant="contained">3 четверть</Button>
          </Link>
          <Link to="4" className={styles.predmetList__btn}>
            <Button variant="contained">4 четверть</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default JournalPeriod;
