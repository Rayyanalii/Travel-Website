import React, { useState, useEffect } from 'react';
import '../../pages/AdminDashboard/DestinationDashboard/DestinationDashboard.css';

const ModifyDestinations = ({ closeMenu, editableData, setmessage }) => {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [caption, setCaption] = useState('');
    const [images, setImages] = useState(Array(3).fill(null));

    const [successMessage, setSuccessMessage] = useState('');

    function handleMenu() {
        closeMenu(false);
    }

    useEffect(() => {
        setCountry(editableData.COUNTRY);
        setCity(editableData.CITY);
        setCaption(editableData.CAPTION);

    }, [editableData]);


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

        formData.append('id', editableData.DESTINATIONID);
        formData.append('country', country);
        formData.append('city', city);
        formData.append('caption', caption);

        const oldImages = editableData.IMAGES.split(",");

        formData.append('oldImages', JSON.stringify({ oldImages }));

        // Add image files (assuming `images` is an array of selected File objects)
        images.forEach((image, index) => {
            formData.append('images', image);  // 'images' should match the field name expected by the backend
        });

        try {
            // Send the POST request with the FormData
            const response = await fetch('http://localhost:3000/api/update-destination', {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                setmessage('Destination updated successfully!'); // Set success message
                closeMenu(false); // Close the menu
            } else {
                // Handle server error
                console.error('Failed to add destination');
                closeMenu(false); // Close the menu
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
                    {successMessage && (
                        <div className="success-message">
                            {successMessage}
                        </div>
                    )}
                    <div className="addDestinationInput">
                        <button type="submit">Modify Destination</button>
                    </div>
                </form>

            </div>
        </>
    );
};

export default ModifyDestinations;
