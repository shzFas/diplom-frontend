import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../../../url";

export const FinalMark = ({ studentId, period, predmetId }) => {
  const [markLesson, setMarkLesson] = useState([]);
  const [markSor, setMarkSor] = useState([]);
  const [markSoch, setMarkSoch] = useState([]);
  const [finish, setFinish] = useState(Number);

  useEffect(() => {
    axios
      .get(`${url}marks/final/${studentId}/${predmetId}/default/${period}`)
      .then((data) => {
        setMarkLesson(data.data);
      });
    axios
      .get(`${url}marks/final/${studentId}/${predmetId}/sor/${period}`)
      .then((data) => {
        setMarkSor(data.data);
      });
    axios
      .get(`${url}marks/final/${studentId}/${predmetId}/soch/${period}`)
      .then((data) => {
        setMarkSoch(data.data);
      });
  }, [studentId, predmetId, period]);

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
    setFinish(rounded(finishResult) * 100);
  }, [finishResult]);

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
      <div className="">Итог:</div>
      <div className="">{formater(finish)}</div>
      <div className="">{formaterMark(finish)}</div>
    </>
  );
};
