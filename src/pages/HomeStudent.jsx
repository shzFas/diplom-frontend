import { Link, Outlet } from 'react-router-dom';
import { Button } from '@mui/material';

export const HomeStudent = () => {

  return (
    <>
      <div className="main__menu">
        <h1>Мои предметы</h1>
      </div>
      <Outlet />
    </>
  );
};
