import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { url } from '../../url';
import { useEffect, useState } from 'react';
import axios from 'axios';

function TableKTP({ urlLink, alertOpen }) {

    const [ktp, setKtp] = useState([]);
    const [value, setValue] = useState(false);

    useEffect(() => {
        axios
            .get(`${url}ktp/${urlLink.predmetId}/${urlLink.classId}`)
            .then((data) => {
                console.log(data)
                if (data.data.length > 0) setValue(true)
                setKtp(data.data)
            })
    }, [urlLink, alertOpen])

    function sortByDate(a, b) {
        return new Date(a.ktpDate).valueOf() - new Date(b.ktpDate).valueOf();
    }

    const handlerSorAndSoch = (e) => {
        if (e === "sor") return "СОР"
        if (e === "soch") return "СОЧ"
        if (e === "default") return "ФО"
    }

    return (
        <>
            {value ?
                <>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Тема урока</TableCell>
                                    <TableCell>Содержание урока</TableCell>
                                    <TableCell>Дата проведения</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ktp.sort(sortByDate).map((row) => (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{row.ktpTitle}</TableCell>
                                        <TableCell>{handlerSorAndSoch(row.ktpSorSoch)}</TableCell>
                                        <TableCell>{row.ktpDate.split("-").reverse().join(".")}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
                :
                <h1>Добавьте план на урок</h1>
            }
        </>
    )
}

export default TableKTP