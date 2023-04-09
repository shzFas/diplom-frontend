import { Link, Outlet } from "react-router-dom";
import { Button } from "@mui/material";

export const HomeAdmin = ({ t }) => {
  return (
    <>
      <div className="main__menu">
        <Link to="/student" className="predmetList__btn">
          <Button variant="contained">{t("students")}</Button>
        </Link>
        <Link to="/teacher" className="predmetList__btn">
          <Button variant="contained">{t("teachers")}</Button>
        </Link>
        <Link to="/predmets" className="predmetList__btn">
          <Button variant="contained">{t("predmetListTitle")}</Button>
        </Link>
        <Link to="/predmet" className="predmetList__btn">
          <Button color="success" variant="contained">
            {t("predmetCreate")}
          </Button>
        </Link>
        <Link to="/register/teacher" className="predmetList__btn">
          <Button color="success" variant="contained">
            {t("registerTeacher")}
          </Button>
        </Link>
        <Link to="/register/student" className="predmetList__btn">
          <Button color="success" variant="contained">
            {t("registerStudent")}
          </Button>
        </Link>
      </div>
      <Outlet />
    </>
  );
};
