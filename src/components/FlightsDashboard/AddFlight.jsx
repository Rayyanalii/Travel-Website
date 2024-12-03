import React from 'react'
import { useState } from "react"


const AddFlight = ({ closeMenu }) => {
    const [airline, setairline] = useState('')
    const [fromcity, setfromcity] = useState('')
    const [tocity, settocity] = useState('');
    const [images, setImages] = useState(Array(1).fill(null));
    const [departuredate, setdeparturedate] = useState('');
    const [availableseats, setavailableseats] = useState('');
    const [seatprice, setseatprice] = useState('');

    const today = new Date().toISOString().split("T")[0];

    const [successMessage, setSuccessMessage] = useState('');

    const handleImageChange = (index, event) => {
        const files = Array.from(event.target.files);
        const updatedImages = [...images];
        updatedImages[index] = files[0];
        setImages(updatedImages);
    };

    function handleMenu() {

        closeMenu(false);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('airline', airline);
        formData.append('fromcity', fromcity);
        formData.append('tocity', tocity);
        formData.append('departuredate', departuredate);
        formData.append('availableseats', availableseats);
        formData.append('seatprice', seatprice);

        images.forEach((image, index) => {
            formData.append('images', image);
        });


        try {
            const response = await fetch('http://localhost:3000/api/add-flight', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setSuccessMessage('Flight added successfully!');
                setairline('');
                setfromcity('');
                settocity('');
                setdeparturedate('');
                setImages(Array(1).fill(null));
                setavailableseats('')
                setseatprice('')
            } else {
                // Handle server error
                console.error('Failed to add Flight');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <>
            <div className="addDestinationMenuContainer">
                <div className="close">
                    <input type="button" value="X" onClick={handleMenu} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="addDestinationInput">
                        <label htmlFor="airline">Flight Airline:</label>
                        <input
                            type="text"
                            name="airline"
                            id="airline"
                            value={airline}
                            onChange={(e) => setairline(e.target.value)}
                            required
                        />
                    </div>
                    <div className="addDestinationInput">
                        <label htmlFor="fromcity">From:</label>
                        <input
                            type="text"
                            name="fromcity"
                            id="fromcity"
                            value={fromcity}
                            onChange={(e) => setfromcity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="addDestinationInput">
                        <label htmlFor="tocity">To:</label>
                        <input
                            type='text'
                            name="tocity"
                            id="tocity"
                            value={tocity}
                            onChange={(e) => settocity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="divider" />

                    {images.map((image, index) => (
                        <div className="addDestinationInput" key={index}>
                            <label htmlFor={`image${index}`}>Image {index + 1}:</label>
                            <input
                                type="file"
                                name={`image${index}`}
                                onChange={(e) => handleImageChange(index, e)}
                                required
                            />
                        </div>
                    ))}

                    <div className="divider" />

                    <div className="addDestinationInput">
                        <label htmlFor="departuredate">Departure Date:</label>
                        <input
                            type='date'
                            name="departuredate"
                            id="departuredate"
                            value={departuredate}
                            onChange={(e) => setdeparturedate(e.target.value)}
                            required
                            min={today}
                        />
                    </div>

                    <div className="addDestinationInput">
                        <label htmlFor="availableseats">Available Seats:</label>
                        <input
                            type='number'
                            name="availableseats"
                            id="availableseats"
                            value={availableseats}
                            onChange={(e) => setavailableseats(e.target.value)}
                            required
                            min={1}
                        />
                    </div>

                    <div className="addDestinationInput">
                        <label htmlFor="seatprice">Seat Price:</label>
                        <input
                            type='number'
                            name="seatprice"
                            id="seatprice"
                            value={seatprice}
                            onChange={(e) => setseatprice(e.target.value)}
                            required
                            min={1}
                        />
                    </div>
                    {successMessage && (
                        <div className="success-message">
                            {successMessage}
                        </div>
                    )}
                    <div className="addDestinationInput">
                        <button type="submit">Add Flight</button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default AddFlight
