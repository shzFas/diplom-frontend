import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "../../../url";

export const StudentProfile = () => {
  const urlLink = useParams();
  const [studentInfo, setStudentInfo] = useState([]);

  useEffect(() => {
    axios.get(`${url}student/${urlLink.studentId}`).then((data) => {
      setStudentInfo(data.data);
      console.log(data.data);
    });
  }, [urlLink]);

  return (
    <div>
      <div className="">
        <h1>{studentInfo.fullName}</h1>
      </div>
    </div>
  );
};
