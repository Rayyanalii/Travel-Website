import React, { useState, useEffect } from 'react'

const ModifyHotel = ({ closeMenu, message, editableData }) => {
    const [hotelName, sethotelName] = useState('')
    const [hotelCity, setHotelCity] = useState('')
    const [hotelDescription, sethotelDescription] = useState('');
    const [logoimage, setlogoImage] = useState(Array(1).fill(null));
    const [images, setImages] = useState(Array(4).fill(null));
    const [hotelClass, sethotelClass] = useState('');
    const [hotelPrice, sethotelPrice] = useState('');

    const [successMessage, setSuccessMessage] = useState('');

    const [Destinations, setDestinations] = useState([])
    const [trips, settrips] = useState([])
    const [selectedDestination, setselectedDestination] = useState(''); // Selected value for the first dropdown
    const [selectedtrip, setSelectedtrip] = useState('');

    const fetchDropdownData = async () => {
        try {
            const response1 = await fetch('http://localhost:3000/api/get-destinations');
            const data1 = await response1.json();
            setDestinations(data1);

            const response2 = await fetch('http://localhost:3000/api/get-trips');
            const data2 = await response2.json();
            settrips(data2);
        } catch (error) {
            console.error('Error fetching dropdown data:', error);
        }
    };

    useEffect(() => {
        sethotelName(editableData.HOTELNAME);
        setHotelCity(editableData.HOTELCITY);
        sethotelDescription(editableData.HOTELDESCRIPTION);
        sethotelClass(editableData.HOTELCLASS);
        sethotelPrice(editableData.HOTELPRICEPERNIGHT);
        setSelectedtrip(editableData.TRIPPACKAGEID);
        setselectedDestination(editableData.DESTINATIONID);
        fetchDropdownData();

        return () => {
            sethotelName('');
            setHotelCity('');
            sethotelDescription('');
            sethotelClass('');
            sethotelPrice('');
        }
    }, [editableData])



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

        formData.append('hotelID', editableData.HOTELID);
        formData.append('hotelName', hotelName);
        formData.append('hotelCity', hotelCity);
        formData.append('hotelDescription', hotelDescription);
        formData.append('hotelClass', hotelClass);
        formData.append('hotelPrice', hotelPrice);
        formData.append('destination', selectedDestination);
        formData.append('trip', selectedtrip);

        logoimage.forEach((image, index) => {
            formData.append('logo', image);
        })

        images.forEach((image, index) => {
            formData.append('images', image);
        });

        const oldimages = editableData.HOTELIMAGES.split(",");
        formData.append('oldImages', JSON.stringify({ oldimages }));

        const oldLogo = editableData.HOTELLOGO.split(",");
        formData.append('oldLogo', JSON.stringify({ oldLogo }));


        try {
            // Send the POST request with the FormData
            const response = await fetch('http://localhost:3000/api/update-hotel', {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                message('Hotel updated successfully!');
                closeMenu(false);
            } else {
                // Handle server error
                message('Failed to update Hotel');
                closeMenu(false);
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

                    {/* Second Dropdown */}
                    <div className="addDestinationInput">
                        <label htmlFor="dropdown2">Trip Package ID:</label>
                        <select
                            id="dropdown2"
                            value={selectedtrip}
                            onChange={(e) => setSelectedtrip(e.target.value)}
                            required
                        >
                            <option value="">-- Select Option --</option>
                            {trips.map((item) => (
                                <option key={item.TRIPPACKAGEID} value={item.TRIPPACKAGEID}>
                                    {item.TRIPPACKAGEID}: {item.TITLE}, {item.CITY}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="divider" />
                    {successMessage && (
                        <div className="success-message">
                            {successMessage}
                        </div>
                    )}
                    <div className="addDestinationInput">
                        <button type="submit">Update Hotel</button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default ModifyHotel
