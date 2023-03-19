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
import styles from "./TeacherList.module.scss";

export const TeacherList = () => {
  const [teacher, setTeacher] = useState([]);

  useEffect(() => {
    axios.get(`${url}teacher`).then((data) => {
      setTeacher(data.data);
    });
  }, []);

  return (
    <div>
      <div className="permission__title">
        <h1>Список учителей: </h1>
      </div>
      <div className={styles.permission__inner}>
        {teacher
          .filter((user) => user.fullName !== "admin")
          .map((data) => (
            <Card className={styles.permission__item}>
              <CardContent>
                <div className={styles.infoInner}>
                  <Typography gutterBottom variant="h5" component="div">
                    {data.fullName}
                  </Typography>
                  <div className={styles.infoPredmetWrapper}>
                    <p className={styles.infoTitle}>Преподаватель: </p>
                    <div className={styles.infoPredmetInner}>
                      {data.permission.map((dataPermission) => (
                        <span className={styles.infoPredmet}>{dataPermission.predmetName}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardActions>
                <Link to={`/teacher/info/${data._id}`} className="permission__text">
                  <Button size="small">Информация</Button>
                </Link>
              </CardActions>
            </Card>
          ))}
      </div>
    </div>
  );
};
