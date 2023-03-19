import { Link, Outlet } from 'react-router-dom';
import { Button } from '@mui/material';

export const Home = () => {

  return (
    <>
      <div className="main__menu">
        <Link to="/journal" className="predmetList__btn">
          <Button variant="contained">Журнал успеваемости</Button>
        </Link>
        <Link to="/ktp" className="predmetList__btn">
          <Button variant="contained">КТП</Button>
        </Link>
      </div>
      <Outlet />
    </>
  );
};
