import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { url } from "../../../url";
import styles from "./StudentList.module.scss";

export const StudentList = ({ t }) => {
  const urlLink = useParams();
  const [students, setStudents] = useState([]);
  const [className, setClassName] = useState("");

  useEffect(() => {
    axios.get(`${url}students/${urlLink.classId}`).then((data) => {
      setStudents(data.data);
    });
  }, [urlLink]);

  useEffect(() => {
    axios.get(`${url}classList/${urlLink.classId}`).then((data) => {
      setClassName(data.data.className);
    });
  }, [urlLink]);

  function sortByName(a, b) {
    if (a.fullName > b.fullName) {
      return 1;
    } else if (b.fullName > a.fullName) {
      return -1;
    } else {
      return 0;
    }
  }

  return (
    <div>
      <div className="permission__title">
        <h1>
          {t("studentsList")} {className} {t("className")}:{" "}
        </h1>
      </div>
      <div className={styles.permission__inner}>
        {students.sort(sortByName).map((data) => (
          <Card className={styles.permission__item}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {data.fullName}
              </Typography>
            </CardContent>
            <CardActions>
              <Link
                to={`/student/info/${data._id}`}
                className="permission__text"
              >
                <Button size="small">{t("info")}</Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};
