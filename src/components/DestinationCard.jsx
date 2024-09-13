import { useState } from 'react'
import React from 'react'
import './DestinationCard.css'

const DestinationCard = (props) => {
  return (
    <>
        <div className="card">
            <a href="/">
            <img src={props.url} alt="" />
            <h3>{props.name}</h3>
            </a>
        </div>
    </>
  )
}

export default DestinationCard
