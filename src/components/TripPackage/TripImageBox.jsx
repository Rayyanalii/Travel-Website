import React from 'react'
import '../../pages/TripPackage.css'

const TripImageBox = (props) => {
  return (
    <>
    <div className="TripPackageImagesContainer">
        <img src="src\assets\LondonDestinationCard.png" alt="" />
        <img src="src\assets\LondonDestinationCard.png" alt="" />
        <img src="src\assets\LondonDestinationCard.png" alt="" />
        <img src="src\assets\LondonDestinationCard.png" alt="" />
        {!props.hotel&&<>
          <img src="src\assets\LondonDestinationCard.png" alt="" />
          <img src="src\assets\LondonDestinationCard.png" alt="" />
        </>
        }
    </div>
    </>
  )
}

export default TripImageBox
