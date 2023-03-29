import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { url } from "../../url";
import "./style.css";

function Mark({ studentId, ktpId, modal, setMarkValue, isLoading, modalDelete }) {
  const [mark, setMark] = useState([]);
  const location = useLocation();

  useEffect(() => {
    axios.get(`${url}mark/${studentId}/${ktpId}`).then((data) => {
      setMark(data.data);
      setMarkValue(true);
    })
  }, [modal, modalDelete, location, setMarkValue]);

  const validationMark = (mark) => {
    if (mark === 0) {
      return "Н";
    }
    return mark;
  };

  const markColor = (mark) => {
    if (mark === 0) {
      return {
        backgroundColor: `gray`,
      };
    }
    if (mark < 4) {
      return {
        backgroundColor: `red`,
      };
    }
    if (mark < 7) {
      return {
        backgroundColor: `orange`,
      };
    }
    if (mark <= 30) {
      return {
        backgroundColor: `green`,
      };
    }
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <div>
            {mark.map((data) => {
              return (
                <>
                  <span
                    className="styleMarkDefault"
                    style={markColor(data?.markValue)}
                    key={data._id}
                  >
                    {validationMark(data?.markValue)}
                  </span>
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default Mark;
