import React from 'react'

const OtherInfo = () => {
  return (
    <>
    <div className="otherInfoContainer">
        <h3>Other Information</h3>
        <div className="allInformationContainer">
            <div className="arrivalContainer">
                <h4>Arrival:</h4>
                <p>Paris International Airport</p>
            </div>
            <div className="departureTimeContainer">
                <h4>Departure Time:</h4>
                <p>11AM</p>
            </div>
            <div className="returnTimeContainer">
                <h4>Return Time:</h4>
                <p>9PM</p>
            </div>
            <div className="includedContainer">
                <h4>Included:</h4>
                <div className="includedItemsContainer">
                    <div className="includedItemsInsideContainer">
                    <p>Airfare</p>
                    <p>5 Star Accomodation</p>
                    </div>
                    <div className="includedItemsInsideContainer">
                    <p>Local Transportation</p>
                    <p>Personal Chauffeur</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default OtherInfo
