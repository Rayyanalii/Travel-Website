import React from 'react'
import '../../pages/TripPackage.css'
import TripImageBox from './TripImageBox'

const VisitingLocations = ({ num, packageData, last }) => {

  const placeImageURL = packageData.PLACEIMAGES.split(",");

  console.log(packageData.PLACEIMAGES);


  if (!packageData) {
    return <div>Error: packageData is not available.</div>; // or return null to render nothing
  }

  return (
    <>
      <div className={!last ? "visitingPlaceContainer" : "visitingPlaceContainer lastPlace"}>
        <h4>{num}. {packageData.PLACETITLE}</h4>
        <p>{packageData.PLACEDESCRIPTION}</p>
        <TripImageBox url={placeImageURL} hotel={false} />
      </div>
    </>
  )
}

export default VisitingLocations
