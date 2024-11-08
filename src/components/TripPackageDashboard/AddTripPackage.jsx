import React, { useState, useEffect } from 'react';
import '../../pages/AdminDashboard/DestinationDashboard/DestinationDashboard.css';

const AddTripPackage = ({ closeMenu }) => {
    // State variables for input fields
    const [packageName, setPackageName] = useState('');
    const [duration, setDuration] = useState('');
    const [availability, setAvailability] = useState('');
    const [numPersons, setNumPersons] = useState('');
    const [backgroundImage, setBackgroundImage] = useState(null);

    // State for dropdowns and inputs
    const [selectedHotel, setSelectedHotel] = useState('');
    const [placesToVisit, setPlacesToVisit] = useState(['']);
    const [ratings, setRatings] = useState(Array(6).fill(''));

    // State for dropdown options fetched from the database
    const [hotelOptions, setHotelOptions] = useState([]);
    const [placesOptions, setPlacesOptions] = useState([]);

    const [successMessage, setSuccessMessage] = useState('');

    const fetchData = async () => {
        try {
            const hotelResponse = await fetch('http://localhost:3000/api/hotels');
            const hotelData = await hotelResponse.json();
            setHotelOptions(hotelData.map(hotel => hotel.name));

            const placesResponse = await fetch('http://localhost:3000/api/best-places');
            const placesData = await placesResponse.json();
            setPlacesOptions(placesData.map(place => place.name));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleMenu = () => closeMenu(false);

    const handleImageChange = (event) => setBackgroundImage(event.target.files[0]);

    const handlePlaceDropdownChange = (index, event) => {
        const updatedPlaces = [...placesToVisit];
        updatedPlaces[index] = event.target.value;
        setPlacesToVisit(updatedPlaces);
    };

    const handleRatingChange = (index, event) => {
        const updatedRatings = [...ratings];
        updatedRatings[index] = event.target.value;
        setRatings(updatedRatings);
    };

    const addPlaceDropdown = () => setPlacesToVisit([...placesToVisit, '']);

    const removePlaceDropdown = (index) => {
        if (placesToVisit.length > 1) {
            const updatedPlaces = placesToVisit.filter((_, i) => i !== index);
            setPlacesToVisit(updatedPlaces);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('packageName', packageName);
        formData.append('duration', duration);
        formData.append('availability', availability);
        formData.append('numPersons', numPersons);
        formData.append('backgroundImage', backgroundImage);
        formData.append('selectedHotel', selectedHotel);
        formData.append('placesToVisit', placesToVisit);
        formData.append('ratings', ratings);

        try {
            const response = await fetch('http://localhost:3000/api/add-trip-package', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setSuccessMessage('Trip package added successfully!');
                setPackageName('');
                setDuration('');
                setAvailability('');
                setNumPersons('');
                setBackgroundImage(null);
                setSelectedHotel('');
                setPlacesToVisit(['']);
                setRatings(Array(6).fill(''));
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
                        <label htmlFor="duration">Duration (in days):</label>
                        <input
                            type="number"
                            id="duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
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
                        <label htmlFor="numPersons">Number of Persons:</label>
                        <input
                            type="number"
                            id="numPersons"
                            value={numPersons}
                            onChange={(e) => setNumPersons(e.target.value)}
                            required
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
                        <label htmlFor="selectedHotel">Hotel:</label>
                        <select
                            id="selectedHotel"
                            value={selectedHotel}
                            onChange={(e) => setSelectedHotel(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select a hotel</option>
                            {hotelOptions.map((hotel, idx) => (
                                <option key={idx} value={hotel}>
                                    {hotel}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="divider" />

                    {placesToVisit.map((place, index) => (
                        <div className="addDestinationInput" key={index}>
                            <label htmlFor={`place${index}`}>Place to Visit {index + 1}:</label>
                            <select
                                id={`place${index}`}
                                value={place}
                                onChange={(e) => handlePlaceDropdownChange(index, e)}
                                required
                            >
                                <option value="" disabled>Select a place</option>
                                {placesOptions.map((option, idx) => (
                                    <option key={idx} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            {placesToVisit.length > 1 && (
                                <button type="button" onClick={() => removePlaceDropdown(index)}>Remove</button>
                            )}
                        </div>
                    ))}
                    <div className="addDestinationInput">
                        <button type="button" onClick={addPlaceDropdown}>Add Place to Visit</button>
                    </div>

                    <div className="divider" />

                    {ratings.map((rating, index) => (
                        <div className="addDestinationInput" key={index}>
                            <label htmlFor={`rating${index}`}>Rating {index + 1} (1-5):</label>
                            <input
                                type="number"
                                id={`rating${index}`}
                                value={rating}
                                onChange={(e) => handleRatingChange(index, e)}
                                min="1"
                                max="5"
                                required
                            />
                        </div>
                    ))}
                    <div className="divider" />

                    <div className="addDestinationInput">
                        <button type="submit">Add Trip Package</button>
                    </div>
                </form>
                {successMessage && (
                    <div className="success-message">
                        {successMessage}
                    </div>
                )}
            </div>
        </>
    );
};

export default AddTripPackage;
