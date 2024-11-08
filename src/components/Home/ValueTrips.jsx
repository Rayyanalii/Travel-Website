import React from 'react'
import '../../pages/Home.css'
import TripCard from '../TripCard'

const ValueTrips = () => {
    return (
        <>
            <div className="valueTripText">
                <h2>Best Value Trips</h2>
                <p>Best trips offered by us!</p>
            </div>
            <div className="AllTripCards">
                <TripCard url="/Uploads/ParisTripCard.png" route="/TripPackage/1/Konnichiwa" title="Konnichiwa" desc="City tours, iconic" price="$3000" star='4' time='5' />
                <TripCard url="src\assets\ParisTripCard.png" route="/TripPackage/2/FrenchFever" title="French Fever" desc="City tours, urban" price="$5000" star='4' time='6' />
                <TripCard url="src\assets\SkarduTripCard.png" route="/TripPackage/3/NorthernBlast" title="Northern Blast" desc="Nature, scenic" price="$2000" star='5' time='8' />
            </div>
        </>
    )
}

export default ValueTrips
