import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Mark from '../Mark';
import styles from './Journal.module.scss';
import ModalMark from '../ModalMark';
import { url } from '../../url';

function Journal({ userData }) {
  const urlLink = useParams();
  const [ktp, setKtp] = useState([]);
  const [student, setStudent] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    axios
      .get(`${url}ktp/${urlLink.id}/${urlLink.classId}`)
      .then((data) => {
        setKtp(data.data);
      })
  }, [urlLink])

  useEffect(() => {
    axios
      .get(`${url}students/${urlLink.classId}`)
      .then((data) => {
        setStudent(data.data);
      })
  }, [urlLink])

  const handleModalMark = () => setModal(true);
  const handleModalMarkClose = () => setModal(false);

  function sortByDate(a, b) {
    return new Date(a.ktpDate).valueOf() - new Date(b.ktpDate).valueOf();
  }

  function sortByName(a, b) {
    if(a.fullName > b.fullName) {
      return 1;
    }else if (b.fullName > a.fullName) {
      return -1;
    }else {
      return 0;
    }
  }

  return (
    <div>
      <div className="">
        <h1>Журнал</h1>
      </div>
      <div className="">

      </div>
      <div className="">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Ученики</TableCell>
                {ktp.sort(sortByDate).map((data) => {
                  return (
                    <TableCell className={data.ktpSorSoch} title={data.ktpTitle}>
                      {data.ktpDate.split("-").reverse().join(".")}
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {student.sort(sortByName).map((data) => (
                <>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    key={data._id}
                  >
                    <TableCell component="th" scope="row">
                      {data.fullName}
                    </TableCell>
                    {ktp.map((mark) => (
                      <TableCell key={mark._id}>
                        <div className={styles.journal__mark}>
                          <Mark key={mark._id + data._id} modal={modal} studentId={data._id} ktpId={mark._id} />
                          <Link to={`${data._id}/${userData._id}/${mark._id}`}>
                            <IconButton onClick={handleModalMark} color="success">
                              <AddIcon />
                            </IconButton>
                          </Link>
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <ModalMark
        handleModalMarkClose={handleModalMarkClose}
        handleModalMark={handleModalMark}
        open={modal}
        setModal={setModal}
      />
    </div>
  )
}

export default Journal