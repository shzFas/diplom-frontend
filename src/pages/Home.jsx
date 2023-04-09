import { Link, Outlet } from "react-router-dom";
import { Button } from "@mui/material";

export const Home = ({ t }) => {
  return (
    <>
      <div className="main__menu">
        <Link to="/journal" className="predmetList__btn">
          <Button variant="contained">{t("jounalBtn")}</Button>
        </Link>
        <Link to="/ktp" className="predmetList__btn">
          <Button variant="contained">{t("ktpBtn")}</Button>
        </Link>
      </div>
      <Outlet />
    </>
  );
};
