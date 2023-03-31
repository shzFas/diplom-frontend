import { Link, Outlet } from "react-router-dom";
import { Button } from "@mui/material";

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
        <Link to="/predmets" className="predmetList__btn">
          <Button variant="contained">Список предметов</Button>
        </Link>
        <Link to="/predmet" className="predmetList__btn">
          <Button color="success" variant="contained">
            Добавить предмет
          </Button>
        </Link>
        <Link to="/register/teacher" className="predmetList__btn">
          <Button color="success" variant="contained">
            Регистрация Учителя
          </Button>
        </Link>
        <Link to="/register/student" className="predmetList__btn">
          <Button color="success" variant="contained">
            Регистрация Ученика
          </Button>
        </Link>
      </div>
      <Outlet />
    </>
  );
};
