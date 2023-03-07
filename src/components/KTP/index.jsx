import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import photoPredmet from '../../assets/predmetPastePhoto.jpg'
import styles from './Ktp.module.scss';

function KTP({ userData }) {
  return (
    <div>
      <div className="permission__title">
        <h1>КТП для предметов:</h1>
      </div>
      <div className={styles.permission__inner}>
        {userData.permission.map((data) => {
          return (
            <Card key={data._id} className={styles.permission__item}>
              <CardMedia
                sx={{ height: 140 }}
                image={photoPredmet}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data.predmetName}
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={data._id} className="permission__text">
                  <Button size="small">Список классов</Button>
                </Link>
              </CardActions>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default KTP