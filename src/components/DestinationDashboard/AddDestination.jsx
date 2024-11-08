import React, { useState, useEffect } from 'react';
import '../../pages/AdminDashboard/DestinationDashboard/DestinationDashboard.css';

const AddDestination = ({ closeMenu }) => {
    // State variables for input fields
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [caption, setCaption] = useState('');
    const [images, setImages] = useState(Array(3).fill(null));

    // State for dropdowns
    const [bestPlaces, setBestPlaces] = useState(Array(4).fill('')); // Array for 4 dropdowns for places to visit
    const [bestEats, setBestEats] = useState(Array(3).fill('')); // Array for 3 dropdowns for places to eat
    const [bestStays, setBestStays] = useState(Array(5).fill('')); // Array for 5 dropdowns for places to stay
    const [tripPackages, setTripPackages] = useState(['']); // Start with one dropdown

    // State for dropdown options fetched from the database
    const [placesOptions, setPlacesOptions] = useState([]);
    const [eatOptions, setEatOptions] = useState([]);
    const [stayOptions, setStayOptions] = useState([]);
    const [tripPackageOptions, setTripPackageOptions] = useState([]);

    const [successMessage, setSuccessMessage] = useState('');

    const fetchData = async () => {
        try {
            // Fetch data from your API for dropdowns
            const placesResponse = await fetch('http://localhost:3000/api/best-places');

            if (!placesResponse.ok) {
                throw new Error(`HTTP error! status: ${placesResponse.status}`);
            }

            console.log('Response:', placesResponse);
            const placesData = await placesResponse.json();
            setPlacesOptions(
                placesData.map(place => ({
                    displayName: `${place.FIRST_NAME}, ${place.LAST_NAME}`,
                    value: `${place.EMPLOYEE_ID}`
                })
                ));


            const eatsResponse = await fetch('http://localhost:3000/api/best-eats');
            if (!eatsResponse.ok) {
                throw new Error(`HTTP error! status: ${eatsResponse.status}`);
            }

            const eatsData = await eatsResponse.json();
            setEatOptions(eatsData.map(eat => eat.FIRST_NAME)); // Adjust based on your actual data structure

            const staysResponse = await fetch('http://localhost:3000/api/best-stays');
            if (!staysResponse.ok) {
                throw new Error(`HTTP error! status: ${staysResponse.status}`);
            }

            const staysData = await staysResponse.json();
            setStayOptions(staysData.map(stay => stay.FIRST_NAME)); // Adjust based on your actual data structure

            const packagesResponse = await fetch('http://localhost:3000/api/trip-packages');
            if (!packagesResponse.ok) {
                throw new Error(`HTTP error! status: ${packagesResponse.status}`);
            }
            const packagesData = await packagesResponse.json();
            setTripPackageOptions(packagesData.map(pkg => pkg.FIRST_NAME)); // Adjust based on your actual data structure
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();

    }, []);

    function handleMenu() {
        closeMenu(false);
    }

    // Handle file input changes
    const handleImageChange = (index, event) => {
        const files = Array.from(event.target.files);
        const updatedImages = [...images];
        updatedImages[index] = files[0]; // Store the first file selected
        setImages(updatedImages);
    };

    const handleDropdownChange = (index, event) => {
        const updatedPlaces = [...bestPlaces];
        updatedPlaces[index] = event.target.value; // Save the primary key in the state
        setBestPlaces(updatedPlaces);
    };

    const handleEatDropdownChange = (index, event) => {
        const updatedEats = [...bestEats];
        updatedEats[index] = event.target.value; // Save selected value for places to eat
        setBestEats(updatedEats);
    };

    const handleStayDropdownChange = (index, event) => {
        const updatedStays = [...bestStays];
        updatedStays[index] = event.target.value; // Save selected value for places to stay
        setBestStays(updatedStays);
    };

    const handleTripPackageChange = (index, event) => {
        const updatedPackages = [...tripPackages];
        updatedPackages[index] = event.target.value; // Save selected value for trip packages
        setTripPackages(updatedPackages);
    };

    const addTripPackageDropdown = () => {
        setTripPackages([...tripPackages, '']); // Add a new empty dropdown
    };

    const removeTripPackageDropdown = (index) => {
        if (tripPackages.length > 1) {
            const updatedPackages = tripPackages.filter((_, idx) => idx !== index); // Remove the selected dropdown
            setTripPackages(updatedPackages);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        // Add text fields
        formData.append('country', country);
        formData.append('city', city);
        formData.append('caption', caption);
        formData.append('bestPlaces', bestPlaces);
        formData.append('bestEats', bestEats);
        formData.append('bestStays', bestStays);
        formData.append('tripPackages', tripPackages);

        // Add image files (assuming `images` is an array of selected File objects)
        images.forEach((image, index) => {
            formData.append('images', image);  // 'images' should match the field name expected by the backend
        });

        try {
            // Send the POST request with the FormData
            const response = await fetch('http://localhost:3000/api/add-destination', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setSuccessMessage('Destination added successfully!'); // Set success message
                // Clear the form if needed
                setCountry('');
                setCity('');
                setCaption('');
                setImages(Array(3).fill(null));
                setBestPlaces(Array(4).fill(''));
                setBestEats(Array(3).fill(''));
                setBestStays(Array(5).fill(''));
                setTripPackages(['']);
            } else {
                // Handle server error
                console.error('Failed to add destination');
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
                        <label htmlFor="country">Country Name:</label>
                        <input
                            type="text"
                            name="country"
                            id="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </div>
                    <div className="addDestinationInput">
                        <label htmlFor="city">City Name:</label>
                        <input
                            type="text"
                            name="city"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="addDestinationInput">
                        <label htmlFor="caption">Caption:</label>
                        <input
                            type="text"
                            name="caption"
                            id="caption"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            required
                        />
                    </div>
                    <div className="divider" />

                    {images.map((image, index) => (
                        <div className="addDestinationInput" key={index}>
                            <label htmlFor={`image${index}`}>Background Image {index + 1}:</label>
                            <input
                                type="file"
                                name={`image${index}`}
                                id={`image${index}`}
                                onChange={(e) => handleImageChange(index, e)}
                                required
                            />
                        </div>
                    ))}
                    <div className="divider" />

                    {/* Dropdowns for Best Places to Visit */}
                    {bestPlaces.map((place, index) => (
                        <div className="addDestinationInput" key={index}>
                            <label htmlFor={`place${index}`}>Best Place to Visit {index + 1}:</label>
                            <select
                                id={`place${index}`}
                                value={place}
                                onChange={(e) => handleDropdownChange(index, e)}
                                required
                            >
                                <option value="" disabled>Select a place</option>
                                {placesOptions.map((option, idx) => (
                                    <option key={idx} value={option.value}>
                                        {option.displayName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                    <div className="divider" />

                    {/* Dropdowns for Best Places to Eat At */}
                    {bestEats.map((eat, index) => (
                        <div className="addDestinationInput" key={index}>
                            <label htmlFor={`eat${index}`}>Best Place to Eat {index + 1}:</label>
                            <select
                                id={`eat${index}`}
                                value={eat}
                                onChange={(e) => handleEatDropdownChange(index, e)}
                                required
                            >
                                <option value="" disabled>Select a place</option>
                                {eatOptions.map((option, idx) => (
                                    <option key={idx} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                    <div className="divider" />

                    {/* Dropdowns for Best Places to Stay At */}
                    {bestStays.map((stay, index) => (
                        <div className="addDestinationInput" key={index}>
                            <label htmlFor={`stay${index}`}>Best Place to Stay {index + 1}:</label>
                            <select
                                id={`stay${index}`}
                                value={stay}
                                onChange={(e) => handleStayDropdownChange(index, e)}
                                required
                            >
                                <option value="" disabled>Select a place</option>
                                {stayOptions.map((option, idx) => (
                                    <option key={idx} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                    <div className="divider" />

                    {/* Dropdowns for Trip Packages */}
                    {/* Dropdowns for Trip Packages */}
                    {tripPackages.map((trip, index) => (
                        <div className="addDestinationInput" key={index}>
                            <label htmlFor={`tripPackage${index}`}>Trip Package {index + 1}:</label>
                            <select
                                id={`tripPackage${index}`}
                                value={trip}
                                onChange={(e) => handleTripPackageChange(index, e)}
                                required
                            >
                                <option value="" disabled>Select a trip package</option>
                                {tripPackageOptions.map((option, idx) => (
                                    <option key={idx} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>

                            {/* Conditionally show Remove button only if there are more than one trip package dropdowns */}
                            {tripPackages.length > 1 && (
                                <button type="button" onClick={() => removeTripPackageDropdown(index)}>Remove</button>
                            )}
                        </div>
                    ))}
                    <div className="addDestinationInput">
                        <button type="button" onClick={addTripPackageDropdown}>Add Trip Package</button>
                    </div>
                    <div className="addDestinationInput">
                        <button type="submit">Add Destination</button>
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

export default AddDestination;
