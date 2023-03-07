import { Alert, Box, Button, Checkbox, Modal, Snackbar, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { styleModal } from './stylemodal';
import { url } from '../../url';

function ModalMark({ handleModalMarkClose, open, setModal }) {
    const urlLink = useParams();
    const [student, setStudent] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [studentFalse, setStudentFalse] = useState(false);
    const [mark, setMark] = useState(Number);

    useEffect(() => {
        axios
            .get(`${url}student/${urlLink?.studentId}`)
            .then((data) => {
                setStudent(data.data)
            })
    }, [urlLink])

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };

    const handleInputStudentFalse = (e) => {
        if (e.target.checked === true) {
            setStudentFalse(true);
            setMark(0);
        };
        if (e.target.checked === false) {
            setStudentFalse(false);
        };
    }

    const handleMarkValue = (e) => {
        if (e.target.value >= 10) {
            setMark(10);
        }
        if (e.target.value < 10) {
            setMark(Number(e.target.value));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios
                .post(`${url}marks`, {
                    markTeacher: urlLink.teacherId,
                    markPredmet: urlLink.id,
                    markStudent: urlLink.studentId,
                    markClassStudent: urlLink.classId,
                    markDate: urlLink.ktpId,
                    markFalse: studentFalse,
                    markValue: mark,
                })
                .then((res) => {
                    setAlertOpen(true);
                    setMark();
                    setModal(false);
                })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleModalMarkClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <h3>{student.fullName}</h3>
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        {studentFalse ? (
                            <></>
                        ) : (
                            <TextField
                                id="outlined-number"
                                label="Оценка"
                                type="number"
                                required
                                onChange={handleMarkValue}
                                value={mark}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        )}
                        <div className="">
                            Ученик отсутствовал<Checkbox value={studentFalse} onChange={handleInputStudentFalse} />
                        </div>
                        <div className="">
                            <Button type="submit" size="large" variant="contained" fullWidth>
                                Поставить оценку
                            </Button>
                        </div>
                    </form>
                </Box>
            </Modal>
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    Оценка выставлена
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalMark