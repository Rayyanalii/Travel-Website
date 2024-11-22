import React, { useState, useEffect } from 'react';
import '../../pages/AdminDashboard/DestinationDashboard/DestinationDashboard.css';

const AddRestaurant = ({ closeMenu }) => {
    // State variables for input fields
    const [restaurantName, setrestaurantName] = useState('');
    const [restaurantCity, setrestaurantCity] = useState('');
    const [restaurantDescription, setrestaurantDescription] = useState('');
    const [images, setImages] = useState(Array(2).fill(null));

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('restaurantName', restaurantName);
        formData.append('restaurantCity', restaurantCity);
        formData.append('restaurantDescription', restaurantDescription);
        formData.append('destination', selectedDestination);

        images.forEach((image, index) => {
            formData.append('images', image);
        });

        try {
            // Send the POST request with the FormData
            const response = await fetch('http://localhost:3000/api/add-restaurant', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setSuccessMessage('Restaurant added successfully!');
                // Clear the form if needed
                setrestaurantName('');
                setrestaurantCity('');
                setrestaurantDescription('');
                setselectedDestination('');
                setImages(Array(2).fill(null));
            } else {
                // Handle server error
                console.error('Failed to add Restaurant');
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
                        <label htmlFor="restaurantName">Restaurant Name:</label>
                        <input
                            type="text"
                            name="restaurantName"
                            id="restaurantName"
                            value={restaurantName}
                            onChange={(e) => setrestaurantName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="addDestinationInput">
                        <label htmlFor="restaurantCity">City Name:</label>
                        <input
                            type="text"
                            name="restaurantCity"
                            id="restaurantCity"
                            value={restaurantCity}
                            onChange={(e) => setrestaurantCity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="addDestinationInput">
                        <label htmlFor="restaurantDescription">Description:</label>
                        <textarea
                            name="restaurantDescription"
                            id="restaurantDescription"
                            value={restaurantDescription}
                            onChange={(e) => setrestaurantDescription(e.target.value)}
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
                    {successMessage && (
                        <div className="success-message">
                            {successMessage}
                        </div>
                    )}
                    <div className="addDestinationInput">
                        <button type="submit">Add Place To Visit</button>
                    </div>
                </form>

            </div>
        </>
    );
};

export default AddRestaurant;
