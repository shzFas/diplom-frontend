import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import styles from "./Journal.module.scss";
import { url } from "../../../url";
import "./custom.css";
import {
  FinalMark,
  Mark,
  ModalMark,
  ModalMarkDelete,
  ProgressReload,
} from "../index.js";

export const Journal = ({ userData, t }) => {
  const urlLink = useParams();
  const [ktp, setKtp] = useState([]);
  const [ktpValue, setKtpValue] = useState(false);
  const [student, setStudent] = useState([]);
  const [studentValue, setStudentValue] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [markValue, setMarkValue] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [maxMarkValue, setMaxMarkValue] = useState(Number);
  const [typeLesson, setTypeLesson] = useState("");
  const [ktpId, setKtpId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    axios
      .get(
        `${url}ktp/period/${urlLink?.classId}/${urlLink?.period}/${urlLink.id}`
      )
      .then((data) => {
        if (data.data.length > 0) {
          setKtpValue(true);
        }
        setKtp(data.data);
      });
  }, [urlLink]);

  useEffect(() => {
    axios.get(`${url}students/${urlLink?.classId}`).then((data) => {
      if (data.data.length > 0) {
        setStudentValue(true);
      }
      setStudent(data.data);
    });
  }, [urlLink]);

  useEffect(() => {
    if ((studentValue && ktpValue) || markValue) setIsLoading(false);
  }, [studentValue, ktpValue, markValue]);

  const handleModalMark = (
    fullnameStudent,
    maxKtpValue,
    ktpId,
    typeLesson,
    teacherId,
    studentId
  ) => {
    setStudentName(fullnameStudent);
    setMaxMarkValue(maxKtpValue);
    setKtpId(ktpId);
    setTypeLesson(typeLesson);
    setTeacherId(teacherId);
    setStudentId(studentId);
    setModal(true);
  };

  const handleModalMarkClose = () => {
    setStudentName("");
    setMaxMarkValue(Number);
    setKtpId("");
    setTypeLesson("");
    setTeacherId("");
    setStudentId("");
    setModal(false);
  };

  const handleModalMarkDelete = (studentId, ktpId) => {
    setStudentId(studentId);
    setKtpId(ktpId);
    setModalDelete(true);
  };
  const handleModalMarkDeleteClose = () => {
    setStudentId("");
    setKtpId("");
    setModalDelete(false);
  };

  function sortByDate(a, b) {
    return new Date(a.ktpDate).valueOf() - new Date(b.ktpDate).valueOf();
  }

  function sortByName(a, b) {
    if (a.fullName > b.fullName) {
      return 1;
    } else if (b.fullName > a.fullName) {
      return -1;
    } else {
      return 0;
    }
  }

  return (
    <>
      {isLoading ? (
        <ProgressReload textInfo={"Добавьте КТП чтобы выставить оценки"} />
      ) : (
        <div>
          <div className="">
            <h1>Журнал</h1>
          </div>
          <div className=""></div>
          <div className="">
            <TableContainer component={Paper}>
              <Table
                sx={{ width: "initial" }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell className={styles.tableItemScroll}>
                      {t("students")}
                    </TableCell>
                    {ktp.sort(sortByDate).map((data) => {
                      return (
                        <TableCell
                          key={data._id}
                          className={data.ktpSorSoch}
                          title={data.ktpTitle}
                        >
                          {data.ktpDate.split("-").reverse().join(".")}
                        </TableCell>
                      );
                    })}
                    <TableCell className={styles.tableItemScrollItog}>
                      Итог:
                    </TableCell>
                    <TableCell className={styles.tableItemScrollItog}>
                      {t("markRecomendPeriod")}:
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {student.sort(sortByName).map((data) => (
                    <>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        key={data._id}
                      >
                        <TableCell
                          className={styles.tableItemScroll}
                          component="th"
                          scope="row"
                        >
                          {data.fullName}
                        </TableCell>

                        {ktp.map((mark) => (
                          <TableCell className={mark.ktpSorSoch} key={mark._id}>
                            <div className={styles.journal__mark}>
                              <Mark
                                key={mark._id + data._id}
                                modal={modal}
                                modalDelete={modalDelete}
                                studentId={data._id}
                                ktpId={mark._id}
                                setMarkValue={setMarkValue}
                                isLoading={isLoading}
                                handleModalMarkDelete={handleModalMarkDelete}
                              />
                              <IconButton
                                onClick={() =>
                                  handleModalMark(
                                    data.fullName,
                                    mark.ktpMaxValue,
                                    mark._id,
                                    mark.ktpSorSoch,
                                    userData._id,
                                    data._id
                                  )
                                }
                                color="success"
                              >
                                <AddIcon />
                              </IconButton>
                            </div>
                          </TableCell>
                        ))}
                        <FinalMark
                          studentId={data._id}
                          predmetId={urlLink.id}
                          modal={modal}
                        />
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <ModalMark
            handleModalMarkClose={handleModalMarkClose}
            handleModalMarkDelete={handleModalMark}
            open={modal}
            setModal={setModal}
            t={t}
            studentName={studentName}
            maxMarkValue={maxMarkValue}
            typeLesson={typeLesson}
            ktpId={ktpId}
            teacherId={teacherId}
            studentId={studentId}
          />
          <ModalMarkDelete
            handleModalMarkDeleteClose={handleModalMarkDeleteClose}
            handleModalMarkDelete={handleModalMarkDelete}
            open={modalDelete}
            setModal={setModalDelete}
            t={t}
            ktpId={ktpId}
            studentId={studentId}
          />
        </div>
      )}
    </>
  );
};
