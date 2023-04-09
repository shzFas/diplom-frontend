import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./JournalPeriod.module.scss";

export const JournalPeriod = ({ t }) => {
  return (
    <>
      <div className="predmetClass__title">
        <h1>{t("classList")}:</h1>
      </div>
      <div>
        <p>{t("period")}</p>
        <div className={styles.buttonLink}>
          <Link to="1" className={styles.predmetList__btn}>
            <Button variant="contained">1 {t("period")}</Button>
          </Link>
          <Link to="2" className={styles.predmetList__btn}>
            <Button variant="contained">2 {t("period")}</Button>
          </Link>
          <Link to="3" className={styles.predmetList__btn}>
            <Button variant="contained">3 {t("period")}</Button>
          </Link>
          <Link to="4" className={styles.predmetList__btn}>
            <Button variant="contained">4 {t("period")}</Button>
          </Link>
        </div>
      </div>
    </>
  );
};
