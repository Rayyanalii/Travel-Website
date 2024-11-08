import React from 'react'
import '../../pages/TripPackage.css'
import TripImageBox from './TripImageBox'

const VisitingLocations = (props) => {
  const { packageData } = props;

  if (!packageData) {
    return <div>Error: packageData is not available.</div>; // or return null to render nothing
  }

  return (
    <>
      <div className={!props.last ? "visitingPlaceContainer" : "visitingPlaceContainer lastPlace"}>
        <h4>{props.num}. {packageData.placeTitle}</h4>
        <p>{packageData.placeDescription}</p>
        <TripImageBox />
      </div>
    </>
  )
}

export default VisitingLocations
