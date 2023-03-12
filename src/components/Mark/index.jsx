import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../../url';
import './style.css'

function Mark({ studentId, ktpId, modal }) {

  const [mark, setMark] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}mark/${studentId}/${ktpId}`)
      .then((data) => {
        setMark(data.data);
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
        backgroundColor: `gray`,
      }
    }
    if(mark < 4) {
      return {
        backgroundColor: `red`,
      }
    }
    if(mark < 7) {
      return {
        backgroundColor: `orange`,
      }
    }
    if(mark < 30) {
      return {
        backgroundColor: `green`,
      }
    }
  }

  return (
    <div>
      {mark.map((data) => {
        return (
          <span className='styleMarkDefault' style={markColor(data?.markValue)} key={data._id}>
            {validationMark(data?.markValue)}
          </span>
        )
      })}
    </div>
  )
}

export default Mark