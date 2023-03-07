import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../../url';

function Mark({ studentId, ktpId, modal }) {

  const [mark, setMark] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}mark/${studentId}/${ktpId}`)
      .then((data) => {
        setMark(data.data)
      })
  }, [modal])

  return (
    <div>
      {mark.map((data) => {
        return (
          <>
            {data.markValue}
          </>
        )
      })}
    </div>
  )
}

export default Mark