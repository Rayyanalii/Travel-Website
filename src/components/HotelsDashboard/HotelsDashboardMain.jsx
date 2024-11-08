import React, { useEffect, useState } from 'react'
import AddHotel from './AddHotel';

const HotelsDashboardMain = () => {
    const [addMenu, setAddMenu] = useState(false);
    const [hotels, sethotels] = useState([]);


    const fetchHotels = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/get-hotels'); // Adjust the URL to match your API
            const data = await response.json();
            sethotels(data);
        } catch (error) {
            console.error('Error fetching places to visit:', error);
        }
    };

    useEffect(() => {
        fetchHotels();
    }, [])

    function handleAddMenu(e) {
        setAddMenu(!addMenu);
    }

    return (
        <>
            <div className="destinationDashboardMainContainerFlexbox">
                <div className="addDestinationContainer">
                    <div className="addDestinationText">
                        <h1>Add New Hotel</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div className="addDestinationButton">
                        <input type="button" value="+" onClick={handleAddMenu} />
                    </div>
                </div>
                <div className="allDestinationsContainer">
                    <div className="addDestinationText">
                        <h1>All Hotels</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div className="allDestinationTableContainer">
                        <table>
                            <thead>
                                <tr>
                                    <th>Hotel ID</th>
                                    <th>Hotel Name</th>
                                    <th>City</th>
                                    <th>Description</th>
                                    <th>Logo URL</th>
                                    <th>Images URLs</th>
                                    <th>Star Class</th>
                                    <th>Price Per Night</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hotels.map((hotel) => (
                                    <tr key={hotel.hotelID}>
                                        <td className="dataField">{hotel.hotelID}</td>
                                        <td className="dataField">{hotel.hotelName}</td>
                                        <td className="dataField">{hotel.hotelCity}</td>
                                        <td className="dataField">{hotel.hotelDescription}</td>
                                        <td className="dataField">{hotel.hotelLogo}</td>
                                        <td className="dataField">{hotel.hotelImages}</td>
                                        <td className="dataField">{hotel.hotelClass}</td>
                                        <td className="dataField">{hotel.hotelPricePerNight}</td>
                                        <td className="dataFieldButton">
                                            <div className="optionsMenu">
                                                <div className="buttonContainer">
                                                    <button className="modifyButton" onClick={() => handleModify(hotel.hotelID)}>Modify</button>
                                                    <button className="deleteButton" onClick={() => handleDelete(hotel.hotelID)}>Delete</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {addMenu && <AddHotel closeMenu={setAddMenu} />}
            </div>
        </>
    )
}

export default HotelsDashboardMain
