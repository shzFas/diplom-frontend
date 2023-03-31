import { TableCell } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { url } from "../../../url";

export const FinalMark = ({ studentId, predmetId, modal }) => {
  const urlLink = useParams();
  const location = useLocation();
  const [markLesson, setMarkLesson] = useState([]);
  const [markSor, setMarkSor] = useState([]);
  const [markSoch, setMarkSoch] = useState([]);
  const [finish, setFinish] = useState(Number);
  const [view, setView] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${url}marks/final/${studentId}/${predmetId}/default/${urlLink?.period}`
      )
      .then((data) => {
        setMarkLesson(data.data);
      });
    axios
      .get(`${url}marks/final/${studentId}/${predmetId}/sor/${urlLink?.period}`)
      .then((data) => {
        setMarkSor(data.data);
      });
    axios
      .get(
        `${url}marks/final/${studentId}/${predmetId}/soch/${urlLink?.period}`
      )
      .then((data) => {
        setMarkSoch(data.data);
      });
  }, [location, studentId, predmetId, modal, urlLink]);

  function summArray(arr) {
    let x = 0;
    return arr.map((i) => (x += i), x).reverse()[0];
  }

  const soch = markSoch.map((data) => data.markValue);

  const sochMax = markSoch.map((data) => data.markMaxValue);

  const sor = markSor.map((data) => data.markValue);

  const sorMax = markSor.map((data) => data.markMaxValue);

  const fo = markLesson.map((data) => data.markValue);

  const finishResult =
    ((summArray(sor) + summArray(fo)) / (summArray(sorMax) + fo.length * 10)) *
      0.5 +
    (soch / sochMax) * 0.5;
  var rounded = function (number) {
    return +number.toFixed(2);
  };

  useEffect(() => {
    if (finishResult === 0) setView(false);
    setFinish(rounded(finishResult) * 100);
  }, [location, finishResult, modal]);

  const formater = (a) => {
    if (isNaN(a)) return "Н/А";
    if (!isNaN(a)) return a + " %";
  };

  const formaterMark = (a) => {
    if (a > 85) return 5;
    if (a > 65) return 4;
    if (a > 40) return 3;
    if (a > 0) return 2;
  };

  return (
    <>
      {view ? (
        <>
          <TableCell>
            <span>{formater(finish)}</span>
          </TableCell>
          <TableCell>
            <span>{formaterMark(finish)}</span>
          </TableCell>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
