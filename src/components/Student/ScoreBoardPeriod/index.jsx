import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { url } from "../../../url";

const links = [
  {
    id: "1",
    link: "1",
    name: "I",
  },
  {
    id: "2",
    link: "2",
    name: "II",
  },
  {
    id: "3",
    link: "3",
    name: "III",
  },
  {
    id: "4",
    link: "4",
    name: "IV",
  },
];

export const ScoreBoardPeriod = ({ t, currLang }) => {
  const urlLink = useParams();
  const [predmetName, setPredmetName] = useState("");

  useEffect(() => {
    axios.get(`${url}predmet/${urlLink.predmetId}?lang=${currLang}`).then((data) => {
      setPredmetName(data?.data.predmetName);
    });
  }, [urlLink, currLang]);

  return (
    <>
      <div>
        <div className="">
          <h1>{t("myDiary")}</h1>
        </div>
        <div className="">
          <h4>{predmetName}</h4>
        </div>
        <div className="main__menu">
          {links.map((data) => (
            <Link key={data.id} to={data.link} className="predmetList__btn">
              <Button variant="contained">
                {data.name} {t("period")}
              </Button>
            </Link>
          ))}
        </div>
        <Outlet />
      </div>
    </>
  );
};
