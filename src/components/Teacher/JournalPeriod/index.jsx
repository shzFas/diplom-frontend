import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./JournalPeriod.module.scss";

export const JournalPeriod = () => {
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
};
