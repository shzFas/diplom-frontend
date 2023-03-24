import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { url } from "../../url";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import styles from "./TableKTP.module.scss";
import { Link, useParams } from "react-router-dom";

function TableKTP({ urlLink, alertOpen }) {
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
  }, [urlLink, alertOpen, urlLinkPeriod]);

  function sortByDate(a, b) {
    return new Date(a.ktpDate).valueOf() - new Date(b.ktpDate).valueOf();
  }

  const handlerSorAndSoch = (e) => {
    if (e === "sor") return "СОР";
    if (e === "soch") return "СОЧ";
    if (e === "default") return "ФО";
  };

  return (
    <>
      <div className={styles.buttonLink}>
        <p>Четверть {urlLinkPeriod?.period}</p>
        <div className={styles.btnPeriod}>
          <Link to="period/1" className={styles.btnPeriodLink}>
            <Button variant="contained">1 четверть</Button>
          </Link>
          <Link to="period/2" className={styles.btnPeriodLink}>
            <Button variant="contained">2 четверть</Button>
          </Link>
          <Link to="period/3" className={styles.btnPeriodLink}>
            <Button variant="contained">3 четверть</Button>
          </Link>
          <Link to="period/4" className={styles.btnPeriodLink}>
            <Button variant="contained">4 четверть</Button>
          </Link>
        </div>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Тема урока</TableCell>
                <TableCell>Содержание урока</TableCell>
                <TableCell>Дата проведения</TableCell>
                <TableCell>Макс. балл</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default TableKTP;
