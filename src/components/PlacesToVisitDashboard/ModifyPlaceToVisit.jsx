import React, { useState } from 'react';
import '../../pages/AdminDashboard/DestinationDashboard/DestinationDashboard.css';
import { useEffect } from 'react';

const ModifyPlaceToVisit = ({ closeMenu, editableData, updateMessage }) => {
    // State variables for input fields
    const [placeTitle, setplaceTitle] = useState('');
    const [placeCity, setplaceCity] = useState('');
    const [placeDescription, setplaceDescription] = useState('');
    const [images, setImages] = useState(Array(5).fill(null)); // Array for 5 image uploads

    const [successMessage, setSuccessMessage] = useState('');

    function handleMenu() {

        closeMenu(false);
    }

    useEffect(() => {
        setplaceTitle(editableData.PLACETITLE);
        setplaceCity(editableData.PLACECITY);
        setplaceDescription(editableData.PLACEDESCRIPTION);

        return () => {
            setplaceTitle('');
            setplaceCity('');
            setplaceDescription('');
        }
    }, [editableData])


    // Handle file input changes
    const handleImageChange = (index, event) => {
        const files = Array.from(event.target.files);
        const updatedImages = [...images];
        updatedImages[index] = files[0];
        setImages(updatedImages);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('placeID', editableData.PLACEID);
        formData.append('placeTitle', placeTitle);
        formData.append('placeCity', placeCity);
        formData.append('placeDescription', placeDescription);
        const imageUrls = editableData.PLACEIMAGES.split(',');
        formData.append('oldImages', JSON.stringify({ imageUrls }));

        images.forEach((image, index) => {
            formData.append('images', image);
        });

        try {
            const response = await fetch('http://localhost:3000/api/update-place-to-visit', {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                setSuccessMessage('Place updated successfully!');
                updateMessage("Place Updated Successfully!");
                closeMenu(false);
            } else {
                // Handle server error
                console.error('Failed to add place to visit');
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
                        <label htmlFor="placeTitle">Place Name:</label>
                        <input
                            type="text"
                            name="placeTitle"
                            id="placeTitle"
                            value={placeTitle}
                            onChange={(e) => setplaceTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="addDestinationInput">
                        <label htmlFor="placeCity">City Name:</label>
                        <input
                            type="text"
                            name="placeCity"
                            id="placeCity"
                            value={placeCity}
                            onChange={(e) => setplaceCity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="addDestinationInput">
                        <label htmlFor="placeDescription">Description:</label>
                        <textarea
                            name="placeDescription"
                            id="placeDescription"
                            value={placeDescription}
                            onChange={(e) => setplaceDescription(e.target.value)}
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
                        <button type="submit">Update Place To Visit</button>
                    </div>
                </form>

            </div>
        </>
    );
};

export default ModifyPlaceToVisit;