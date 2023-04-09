import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "../../../url";
import emptyMark from "../../../assets/emptyMark.svg";
import styles from "./ScoreBoard.module.scss";
import { FinalMark, Mark } from "../index";

export const ScoreBoard = ({ userData, t }) => {
  const urlLink = useParams();
  const [mark, setMark] = useState([]);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${url}marks/all/${userData._id}/${urlLink.predmetId}/${urlLink.period}`
      )
      .then((data) => {
        if (data.data.length > 0) {
          setEmpty(true);
          setMark(data.data);
        } else {
          setEmpty(false);
        }
      });
  }, [userData, urlLink]);

  return (
    <div>
      <div className="">
        <h3>
          {urlLink.period} {t("period")}
        </h3>
      </div>
      {empty ? (
        <>
          <div className={styles.innerMarkList}>
            {mark.map((data) => (
              <Mark t={t} key={data._id} data={data} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className={styles.emptyMark}>
            <img src={emptyMark} alt="" />
            <div className="">
              <h4>{t("noMarks")}</h4>
            </div>
          </div>
        </>
      )}
      <div className={styles.finalPeriod}>
        <FinalMark
          studentId={userData._id}
          predmetId={urlLink.predmetId}
          period={urlLink.period}
        />
      </div>
    </div>
  );
};
