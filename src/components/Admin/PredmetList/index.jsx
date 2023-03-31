import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Snackbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { url } from "../../../url";
import styles from "./PredmetList.module.scss";

export const PredmetList = ({
  openDeletePredmet,
  handleCloseSuccessPredmetDeleteError,
}) => {
  const [predmetList, setPredmetList] = useState([]);

  useEffect(() => {
    axios.get(`${url}predmet`).then((data) => {
      setPredmetList(data.data);
    });
  }, []);

  return (
    <div>
      <div className="predmetList__title">
        <h1>Предметы</h1>
      </div>
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
                to={`/predmet/info/${data._id}`}
                className="permission__text"
              >
                <Button size="small">Информация</Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </div>
      <Snackbar
        open={openDeletePredmet}
        autoHideDuration={6000}
        onClose={handleCloseSuccessPredmetDeleteError}
      >
        <Alert
          onClose={handleCloseSuccessPredmetDeleteError}
          severity="error"
          sx={{ width: "100%" }}
        >
          Предмет удален
        </Alert>
      </Snackbar>
    </div>
  );
};
