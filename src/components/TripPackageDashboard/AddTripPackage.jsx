import React, { useState, useEffect } from 'react';
import '../../pages/AdminDashboard/DestinationDashboard/DestinationDashboard.css';

const AddTripPackage = ({ closeMenu }) => {
    // State variables for input fields
    const [packageName, setPackageName] = useState('');
    const [city, setCity] = useState('');
    const [duration, setDuration] = useState('');
    const [availability, setAvailability] = useState('');
    const [req, setreq] = useState('');
    const [price, setPrice] = useState('');
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [ratings, setRatings] = useState(Array(6).fill(null));

    const [successMessage, setSuccessMessage] = useState('');

    const [Destinations, setDestinations] = useState([])
    const [selectedDestination, setselectedDestination] = useState(''); // Selected value for the first dropdown


    const fetchDropdownData = async () => {
        try {
            const response1 = await fetch('http://localhost:3000/api/get-destinations');
            const data1 = await response1.json();
            setDestinations(data1);

        } catch (error) {
            console.error('Error fetching dropdown data:', error);
        }
    };

    useEffect(() => {
        fetchDropdownData();
    }, []);

    const handleMenu = () => closeMenu(false);

    const handleImageChange = (event) => setBackgroundImage(event.target.files[0]);


    const handleRatingChange = (index, event) => {
        const updatedRatings = [...ratings];
        updatedRatings[index] = event.target.value;
        setRatings(updatedRatings);
    };

    const ratingArr = ["Accomodation", "Destination", "Value", "Transport", "Meals", "Overall"];

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('packageName', packageName);
        formData.append('city', city);
        formData.append('duration', duration);
        formData.append('availability', availability);
        formData.append('reqs', req);
        formData.append('images', backgroundImage);
        formData.append('ratings', ratings);
        formData.append('price', price);

        formData.append('destination', selectedDestination);

        try {
            const response = await fetch('http://localhost:3000/api/add-trip', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setSuccessMessage('Trip package added successfully!');
                setPackageName('');
                setCity('');
                setDuration('');
                setAvailability('');
                setreq('');
                setPrice('');
                setBackgroundImage(null);
                setselectedDestination('');
                setRatings(Array(6).fill(null));
            } else {
                console.error('Failed to add trip package');
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
                        <label htmlFor="packageName">Trip Package Name:</label>
                        <input
                            type="text"
                            id="packageName"
                            value={packageName}
                            onChange={(e) => setPackageName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="addDestinationInput">
                        <label htmlFor="City">City:</label>
                        <input
                            type="text"
                            id="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="addDestinationInput">
                        <label htmlFor="duration">Duration (in days):</label>
                        <input
                            type="number"
                            id="duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
                            min={1}
                        />
                    </div>
                    <div className="addDestinationInput">
                        <label htmlFor="availability">Availability:</label>
                        <input
                            type="text"
                            id="availability"
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                            required
                        />
                    </div>
                    <div className="addDestinationInput">
                        <label htmlFor="req">Number of Persons:</label>
                        <input
                            type="number"
                            id="req"
                            value={req}
                            onChange={(e) => setreq(e.target.value)}
                            required
                            min={1}
                        />
                    </div>
                    <div className="addDestinationInput">
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            min={1}
                        />
                    </div>
                    <div className="addDestinationInput">
                        <label htmlFor="backgroundImage">Background Image:</label>
                        <input
                            type="file"
                            id="backgroundImage"
                            onChange={handleImageChange}
                            required
                        />
                    </div>

                    <div className="divider" />

                    <div className="addDestinationInput">
                        <label htmlFor="dropdown1">Destination ID:</label>
                        <select
                            id="dropdown1"
                            value={selectedDestination}
                            onChange={(e) => setselectedDestination(e.target.value)}
                            required
                        >
                            <option value="">-- Select Option --</option>
                            {Destinations.map((item) => (
                                <option key={item.DESTINATIONID} value={item.DESTINATIONID}>
                                    {item.DESTINATIONID}: {item.CITY}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="divider" />


                    {ratings.map((rating, index) => (
                        <div className="addDestinationInput" key={index}>
                            <label htmlFor={`rating${index}`}>{ratingArr[index]} (1-5):</label>
                            <input
                                type="number"
                                id={`rating${index}`}
                                value={rating}
                                onChange={(e) => handleRatingChange(index, e)}
                                min={1}
                                max={5}
                                required
                            />
                        </div>
                    ))}
                    <div className="divider" />
                    {successMessage && (
                        <div className="success-message">
                            {successMessage}
                        </div>
                    )}

                    <div className="addDestinationInput">
                        <button type="submit">Add Trip Package</button>
                    </div>
                </form>

            </div>
        </>
    );
};

export default AddTripPackage;
