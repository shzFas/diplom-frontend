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
import { Link, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Mark from "../Mark";
import styles from "./Journal.module.scss";
import ModalMark from "../ModalMark";
import ProgressReload from "../ProgressReload";
import { url } from "../../url";
import "./custom.css";
import FinalMark from "../FinalMark";
import ModalMarkDelete from "../ModalMarkDelete";
import { style } from "@mui/system";

function Journal({ userData }) {
  const urlLink = useParams();
  const [ktp, setKtp] = useState([]);
  const [ktpValue, setKtpValue] = useState(false);
  const [student, setStudent] = useState([]);
  const [studentValue, setStudentValue] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [markValue, setMarkValue] = useState(false);

  useEffect(() => {
    axios.get(`${url}ktp/${urlLink.id}/${urlLink?.classId}`).then((data) => {
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
    if (markValue === true || studentValue === true && ktpValue === true) setIsLoading(false);
  }, [studentValue, ktpValue, markValue]);

  const handleModalMark = () => setModal(true);
  const handleModalMarkClose = () => setModal(false);

  const handleModalMarkDelete = () => setModalDelete(true);
  const handleModalMarkDeleteClose = () => setModalDelete(false);

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
                      Ученики
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
                      Рекомендуемая оценка:
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
                              <Link
                                to={`delete/${data._id}/${mark._id}`}
                                onClick={handleModalMarkDelete}
                                className={styles.deleteFunction}
                              >
                                <Mark
                                  key={mark._id + data._id}
                                  modal={modal}
                                  modalDelete={modalDelete}
                                  studentId={data._id}
                                  ktpId={mark._id}
                                  setMarkValue={setMarkValue}
                                  isLoading={isLoading}
                                />
                              </Link>
                              <Link
                                to={`${data._id}/${userData._id}/${mark._id}/${mark.ktpSorSoch}/${mark.ktpMaxValue}`}
                                className={`icon`}
                              >
                                <IconButton
                                  onClick={handleModalMark}
                                  color="success"
                                >
                                  <AddIcon />
                                </IconButton>
                              </Link>
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
          />
          <ModalMarkDelete
            handleModalMarkDeleteClose={handleModalMarkDeleteClose}
            handleModalMarkDelete={handleModalMarkDelete}
            open={modalDelete}
            setModal={setModalDelete}
          />
        </div>
      )}
    </>
  );
}

export default Journal;
