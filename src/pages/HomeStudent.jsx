import { Outlet } from "react-router-dom";

export const HomeStudent = ({ t }) => {
  return (
    <>
      <div className="main__menu">
        <h1>{t("myPredmets")}</h1>
      </div>
      <Outlet />
    </>
  );
};
