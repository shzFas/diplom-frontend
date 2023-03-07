import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './PredmetClassList.module.scss';
import { url } from '../../url';

function PredmetClassList() {
  const idPredmet = useParams();
  const [predmetClass, setPredmetClass] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}predmet/${idPredmet.id}`)
      .then((data) => {
        setPredmetClass(data.data.classes);
      })
  }, [idPredmet])

  return (
    <>
      <div className="predmetClass__title">
        <h1>Список классов:</h1>
      </div>
      <div className={styles.predmetClass__inner}>
        {predmetClass.map((data) => {
          return (
            <Card key={data._id} className={styles.predmetClass__item}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data.className}
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={data._id} className="permission__text">
                  <Button size="small">Журнал</Button>
                </Link>
              </CardActions>
            </Card>
          )
        })}
      </div>
    </>
  )
}

export default PredmetClassList