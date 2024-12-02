import React from 'react'
import '../../pages/Home.css'
import TripCard from '../TripCard'
import { useState } from 'react';
import { useEffect } from 'react';

const ValueTrips = () => {
    const [tripCard, settripCard] = useState([]);

    const fetchTripCard = async () => {
        try {

            const response = await fetch('http://localhost:3000/api/get-trip-card'); // Fetch data from the endpoint

            if (!response.ok) {
                throw new Error('Trip package not found'); // Handle errors if the response is not ok
            }

            const data = await response.json(); // Parse the response JSON


            settripCard(data); // Set the data in state
        } catch (error) {
            console.error("No Trips Found");

        }
    };

    useEffect(() => {
        fetchTripCard();

    }, [])

    return (
        <>
            <div className="valueTripText">
                <h2>Best Value Trips</h2>
                <p>Best trips offered by us!</p>
            </div>
            <div className="AllTripCards">
                {tripCard && tripCard.map((trip, index) => (
                    <TripCard
                        key={index}
                        url={trip.IMAGE}
                        route={`/TripPackage/${trip.TRIPPACKAGEID}/${encodeURIComponent(trip.TITLE)}`}
                        title={trip.TITLE}
                        desc={trip.CITY}
                        price={trip.PRICE}
                        star={trip.OVERALLRATING}
                        time={trip.PACKAGEDURATION}
                    />
                ))}
                {tripCard.length == 0 && <p>No Trip Packages Found</p>}
            </div>
        </>
    )
}

export default ValueTrips
