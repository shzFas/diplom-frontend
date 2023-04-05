import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { url } from "../../../url";
import styles from "./StudentMain.module.scss";

export const StudentMain = ({ userData }) => {
  const [predmetList, setPredmetList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get(`${url}predmet/class/${userData.classId}`).then((data) => {
      if (data?.data.length > 0) {
        setIsLoading(true);
        setPredmetList(data?.data);
      }
    });
  }, [userData]);

  return (
    <div>
      {isLoading ? (
        <>
        <div className={styles.predmetList__inner}>
          {predmetList.map((data) => (
            <Card key={data._id} className={styles.predmetList__item}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data.predmetName}
                </Typography>
              </CardContent>
              <CardActions>
                <Link
                  to={`score/${data._id}`}
                  className="permission__text"
                >
                  <Button size="small">Дневник</Button>
                </Link>
              </CardActions>
            </Card>
          ))}
        </div>
        </>
      ) : (
        <>
          <h1>Загрузка</h1>
        </>
      )}
    </div>
  );
};
