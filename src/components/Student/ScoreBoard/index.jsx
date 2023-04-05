import React from 'react'
import { useParams } from 'react-router-dom'

export const ScoreBoard = () => {
  const urlLink = useParams();

  return (
    <div>
      <div className="">
        <h3>{urlLink.period} четверть</h3>
      </div>
    </div>
  )
}
