import React from 'react'
import '../../pages/TripPackage.css'
import TripImageBox from './TripImageBox'

const VisitingLocations = (props) => {
  return (
    <>
    <div className={!props.last?"visitingPlaceContainer":"visitingPlaceContainer lastPlace"}>
        <h4>{props.num}. Eiffel Tower</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur sint quas quo non quod, iure exercitationem nostrum veritatis quibusdam neque aliquam ad nesciunt quaerat magnam quisquam in dolores eos maxime.</p>
        <TripImageBox/>
    </div>
    </>
  )
}

export default VisitingLocations
