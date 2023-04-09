import React, { useEffect, useState } from "react";
import styles from "./Mark.module.scss";
import axios from "axios";
import { url } from "../../../url";
import { typeLesson, handlerDate, markColor } from "../../../formater";
import "./index.css";

export const Mark = ({ data, t }) => {
  const [ktpTitle, setKtpTitle] = useState("");
  const [ktpDate, setKtpDate] = useState("");

  useEffect(() => {
    axios.get(`${url}ktps/${data?.markDate}`).then((data) => {
      setKtpTitle(data?.data?.ktpTitle);
      setKtpDate(data?.data?.ktpDate);
    });
  }, [data]);

  return (
    <div className={styles.markElem + " mark" + data.markSochSor}>
      <div className={styles.markElemInner}>
        <div className={styles.markTop}>
          <div className="">
            <div className="">
              {t("lessonTheme")}: {ktpTitle}
            </div>
            <div className="">
              {t("lessonType")}: {typeLesson(data.markSochSor)}
            </div>
          </div>
          <div className="">
            {t("lessonDate")}: {handlerDate(ktpDate)}
          </div>
        </div>
        <div className={styles.markBottom}>
          <div className="">
            <span
              style={markColor(data?.markValue)}
              className={styles.styleMarkDefault}
            >
              {data.markValue}
            </span>
            <span>из</span>
            <span className={styles.styleMarkMaxValue}>
              {data.markMaxValue}
            </span>
          </div>
          <div className="">
            {t("setMarkDiary")}: {handlerDate(data.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};
