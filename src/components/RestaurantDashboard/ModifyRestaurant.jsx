import React, { useEffect, useState } from 'react';
import '../../pages/AdminDashboard/DestinationDashboard/DestinationDashboard.css';

const ModifyRestaurant = ({ closeMenu, editData, updateMessage }) => {
    // State variables for input fields
    const [restaurantName, setrestaurantName] = useState('');
    const [restaurantCity, setrestaurantCity] = useState('');
    const [restaurantDescription, setrestaurantDescription] = useState('');
    const [images, setImages] = useState(Array(2).fill(null));

    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        setrestaurantName(editData.RESTAURANTNAME);
        setrestaurantCity(editData.RESTAURANTCITY);
        setrestaurantDescription(editData.RESTAURANTDESCRIPTION);

        return () => {
            setrestaurantName('')
            setrestaurantDescription('')
            setrestaurantCity('')
        }

    }, [editData])


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

        formData.append('restaurantID', editData.RESTAURANTID);
        formData.append('restaurantName', restaurantName);
        formData.append('restaurantCity', restaurantCity);
        formData.append('restaurantDescription', restaurantDescription);
        const oldImages = editData.RESTAURANTIMAGES.split(',');
        formData.append('oldImages', JSON.stringify({ oldImages }));

        images.forEach((image, index) => {
            formData.append('images', image);
        });

        try {
            // Send the POST request with the FormData
            const response = await fetch('http://localhost:3000/api/update-restaurant', {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                setSuccessMessage('Restaurant updated successfully!');
                updateMessage("Restaurant Updated Successfully!");
                closeMenu(false);
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
                        <button type="submit">Update Restaurant</button>
                    </div>
                </form>

            </div>
        </>
    );
};

export default ModifyRestaurant;
