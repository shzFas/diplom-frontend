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

  const validationMark = (mark) => {
    if(mark === 0) {
      return 'Н'
    }
    return mark;
  }

  const markColor = (mark) => {
    if(mark === 0) {
      return {
        color: `white`,
        backgroundColor: `gray`,
        padding: `2px`
      }
    }
    if(mark < 4) {
      return {
        color: `white`,
        backgroundColor: `red`,
        padding: `2px`
      }
    }
    if(mark < 7) {
      return {
        color: `white`,
        backgroundColor: `orange`,
        padding: `2px`
      }
    }
    if(mark < 30) {
      return {
        color: `white`,
        backgroundColor: `green`,
        padding: `2px`
      }
    }
  }

  return (
    <div>
      {mark.map((data) => {
        return (
          <span style={markColor(data?.markValue)} key={data._id}>
            {validationMark(data?.markValue)}
          </span>
        )
      })}
    </div>
  )
}

export default Mark