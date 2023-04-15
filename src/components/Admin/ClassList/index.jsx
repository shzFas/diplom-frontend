import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { url } from "../../../url";
import styles from "./ClassList.module.scss";

export const ClassList = ({ t, currLang }) => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios.get(`${url}classList?lang=${currLang}`).then((data) => {
      setClasses(data.data);
    });
  }, [currLang]);

  return (
    <div>
      <div className="permission__title">
        <h1>{t("classList")}: </h1>
      </div>
      <div className={styles.permission__inner}>
        {classes.map((data) => (
          <Card className={styles.permission__item}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {data.className}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={data._id} className="permission__text">
                <Button size="small">{t("studentsList")}</Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};
