import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { url } from "../../../url";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import styles from "./TableKTP.module.scss";
import { Link, useParams } from "react-router-dom";

export const TableKTP = ({
  urlLink,
  t,
  setSnackBarMessage,
  setOpenSnackbarError,
  openSnackbar,
  openSnackbarError,
}) => {
  const urlLinkPeriod = useParams();
  const [ktp, setKtp] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${url}ktp/period/${urlLink.classId}/${urlLinkPeriod.period}/${urlLink.predmetId}/`
      )
      .then((data) => {
        setKtp(data.data);
      });
  }, [urlLink, openSnackbar, openSnackbarError, urlLinkPeriod]);

  function sortByDate(a, b) {
    return new Date(a.ktpDate).valueOf() - new Date(b.ktpDate).valueOf();
  }

  const handlerSorAndSoch = (e) => {
    if (e === "sor") return "СОР";
    if (e === "soch") return "СОЧ";
    if (e === "default") return "ФО";
  };

  const handlerDelete = (ktpId) => {
    axios.delete(`${url}ktp/${ktpId}`).then(() => {
      setOpenSnackbarError(true);
      setSnackBarMessage("КТП и все оценки за этот урок удалены");
    });
  };

  return (
    <>
      <div className={styles.buttonLink}>
        <p>
          {t("period")} {urlLinkPeriod?.period}
        </p>
        <div className={styles.btnPeriod}>
          <Link to="period/1" className={styles.btnPeriodLink}>
            <Button variant="contained">1 {t("period")}</Button>
          </Link>
          <Link to="period/2" className={styles.btnPeriodLink}>
            <Button variant="contained">2 {t("period")}</Button>
          </Link>
          <Link to="period/3" className={styles.btnPeriodLink}>
            <Button variant="contained">3 {t("period")}</Button>
          </Link>
          <Link to="period/4" className={styles.btnPeriodLink}>
            <Button variant="contained">4 {t("period")}</Button>
          </Link>
        </div>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{t("lessonTheme")}</TableCell>
                <TableCell>{t("lessonType")}</TableCell>
                <TableCell>{t("lessonDate")}</TableCell>
                <TableCell>{t("lessonMaxValue")}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ktp.sort(sortByDate).map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.ktpTitle}</TableCell>
                  <TableCell>{handlerSorAndSoch(row.ktpSorSoch)}</TableCell>
                  <TableCell>
                    {row.ktpDate.split("-").reverse().join(".")}
                  </TableCell>
                  <TableCell>{row.ktpMaxValue}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handlerDelete(row._id)}
                      color="error"
                      variant="contained"
                    >
                      {t("delete")}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
