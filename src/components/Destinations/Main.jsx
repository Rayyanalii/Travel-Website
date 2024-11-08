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

            const updatedData = result.map(destination => {
                const firstImageUrl = destination.first_image_url; // Split to get the first image URL
                return {
                    ...destination,
                    firstImageUrl, // Add the first image URL to each destination object
                    link: `/Destinations/${destination.CITY}`
                };
            });
            setData(updatedData); // Store fetched data in state
        } catch (error) {
            console.error('Error fetching destinations:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <main>
                <div className="allDestinationCards">
                    {data.map((item, index) => (
                        <DestinationCard key={index} imageUrl={item.firstImageUrl} name={item.CITY} url={item.link} />
                    ))}
                </div>
            </main>
        </>
    )
}

export default Main
