import React from 'react'
import '../../pages/TripPackage.css'

const TripImageBox = ({ url, hotel }) => {


  return (
    <>
      <div className="TripPackageImagesContainer">
        <img src={url[0]} alt="" />
        <img src={url[1]} alt="" />
        <img src={url[2]} alt="" />
        <img src={url[3]} alt="" />
        {!hotel && <>
          <img src={url[4]} alt="" />
        </>
        }
      </div>
    </>
  )
}

export default TripImageBox
