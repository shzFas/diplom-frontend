import { Link, Outlet } from 'react-router-dom';
import { Button } from '@mui/material';

export const HomeAdmin = () => {

  return (
    <>
      <div className="main__menu">
        <Link to="/student" className="predmetList__btn">
          <Button variant="contained">Ученики</Button>
        </Link>
        <Link to="/teacher" className="predmetList__btn">
          <Button variant="contained">Учителя</Button>
        </Link>
      </div>
      <Outlet />
    </>
  );
};
