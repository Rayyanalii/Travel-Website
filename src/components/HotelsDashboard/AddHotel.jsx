import React, { useState } from 'react'

const AddHotel = ({ closeMenu }) => {
    const [hotelName, sethotelName] = useState('')
    const [hotelCity, setHotelCity] = useState('')
    const [hotelDescription, sethotelDescription] = useState('');
    const [logoimage, setlogoImage] = useState(Array(1).fill(null));
    const [images, setImages] = useState(Array(4).fill(null));
    const [hotelClass, sethotelClass] = useState('');
    const [hotelPrice, sethotelPrice] = useState('');

    const [successMessage, setSuccessMessage] = useState('');


    function handleLogoImageChange(index, event) {
        const files = Array.from(event.target.files);
        const updatedImages = [...logoimage];
        updatedImages[index] = files[0]; // Store the first file selected
        setlogoImage(updatedImages);
    }

    const handleImageChange = (index, event) => {
        const files = Array.from(event.target.files);
        const updatedImages = [...images];
        updatedImages[index] = files[0]; // Store the first file selected
        setImages(updatedImages);
    };

    function handleMenu() {
        closeMenu(false);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('hotelName', hotelName);
        formData.append('hotelCity', hotelCity);
        formData.append('hotelDescription', hotelDescription);
        formData.append('hotelClass', hotelClass);
        formData.append('hotelPrice', hotelPrice);

        logoimage.forEach((image, index) => {
            formData.append('logo', image);
        })

        images.forEach((image, index) => {
            formData.append('images', image);
        });


        try {
            // Send the POST request with the FormData
            const response = await fetch('http://localhost:3000/api/add-hotel', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setSuccessMessage('Hotel added successfully!');
                // Clear the form if needed
                sethotelName('');
                setHotelCity('');
                sethotelDescription('');
                setlogoImage(Array(1).fill(null));
                setImages(Array(2).fill(null));
                sethotelClass('')
                sethotelPrice('')
            } else {
                // Handle server error
                console.error('Failed to add Hotel');
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
                        <label htmlFor="hotelName">Hotel Name:</label>
                        <input
                            type="text"
                            name="hotelName"
                            id="hotelName"
                            value={hotelName}
                            onChange={(e) => sethotelName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="addDestinationInput">
                        <label htmlFor="hotelCity">City Name:</label>
                        <input
                            type="text"
                            name="hotelCity"
                            id="hotelCity"
                            value={hotelCity}
                            onChange={(e) => setHotelCity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="addDestinationInput">
                        <label htmlFor="hotelDescription">Description:</label>
                        <textarea
                            name="hotelDescription"
                            id="hotelDescription"
                            value={hotelDescription}
                            onChange={(e) => sethotelDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="divider" />

                    {logoimage.map((image, index) => (
                        <div className="addDestinationInput" key={index}>
                            <label htmlFor={`image${index}`}>Logo Image {index + 1}:</label>
                            <input
                                type="file"
                                name={`image${index}`}
                                onChange={(e) => handleLogoImageChange(index, e)}
                                required
                            />
                        </div>
                    ))}
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
                        <label htmlFor="hotelClass">Star Class:</label>
                        <input
                            type='number'
                            name="hotelClass"
                            id="hotelClass"
                            value={hotelClass}
                            onChange={(e) => sethotelClass(e.target.value)}
                            required
                        />
                    </div>

                    <div className="addDestinationInput">
                        <label htmlFor="hotelPrice">Price per night:</label>
                        <input
                            type='number'
                            name="hotelPrice"
                            id="hotelPrice"
                            value={hotelPrice}
                            onChange={(e) => sethotelPrice(e.target.value)}
                            required
                        />
                    </div>

                    <div className="addDestinationInput">
                        <button type="submit">Add Hotel</button>
                    </div>
                </form>
                {successMessage && (
                    <div className="success-message">
                        {successMessage}
                    </div>
                )}
            </div>
        </>
    )
}

export default AddHotel
