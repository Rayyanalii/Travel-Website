import React from 'react'
import DestinationCard from './DestinationCard'
import { useState, useEffect } from 'react';

const Main = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/get-destination-card');

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const result = await response.json();

            setData(result)
        } catch (error) {
            console.error('Error fetching destinations:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="allDestinationCards">
                {data && data.map((item, index) => (
                    <DestinationCard key={index} imageUrl={item.IMAGES.split(",")[0]} name={item.CITY} url={`/Destinations/${item.DESTINATIONID}/${item.CITY}`} />
                ))}
                {data.length == 0 && <p>No Destinations Found</p>}

            </div>
        </>
    )
}

export default Main;
