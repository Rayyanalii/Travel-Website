import React, { useEffect, useState } from 'react'
import AddHotel from './AddHotel';
import ModifyHotel from './ModifyHotel';

const HotelsDashboardMain = () => {
    const [addMenu, setAddMenu] = useState(false);
    const [hotels, sethotels] = useState([]);
    const [editMenu, setEditMenu] = useState(false);
    const [message, setMessage] = useState('');
    const [editableData, setEditableData] = useState([]);


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
        if (message) {
            const timeout = setTimeout(() => {
                setMessage('');
            }, 2000);

            return () => {
                clearTimeout(timeout);
            }
        }
    }, [addMenu, editMenu])

    function handleAddMenu(e) {
        setAddMenu(!addMenu);
    }

    async function handleDelete(id) {
        const hotel = hotels.find((h) => h.HOTELID === id);
        if (hotel) {
            const images = hotel.HOTELIMAGES.split(",");
            const logo = hotel.HOTELLOGO.split(",");

            try {

                const res = await fetch(`http://localhost:3000/api/delete-hotel/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ images, logo }),
                })
                if (res.ok) {
                    alert('Hotel deleted successfully');
                    fetchHotels();
                }
                else {
                    alert('Error deleting Hotel');
                }
            }
            catch (error) {
                console.error('Error deleting Hotel:', error);
                alert('Error deleting Hotel');
            }
        }

    }
    function handleModify(id) {
        const hotel = hotels.find((h) => h.HOTELID === id);
        setEditableData(hotel);
        setEditMenu(true);
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
                    {message && <>
                        <div className="success-message">
                            <p>{message}</p>
                        </div>
                    </>}
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
                                    <th>Destination ID</th>
                                    <th>Trip Package ID</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hotels.map((hotel) => (
                                    <tr key={hotel.HOTELID}>
                                        <td className="dataField">{hotel.HOTELID}</td>
                                        <td className="dataField">{hotel.HOTELNAME}</td>
                                        <td className="dataField">{hotel.HOTELCITY}</td>
                                        <td className="dataField">{hotel.HOTELDESCRIPTION}</td>
                                        <td className="dataField">{hotel.HOTELLOGO}</td>
                                        <td className="dataField">
                                            {hotel.HOTELIMAGES.split(',').map((image, index) => (
                                                <React.Fragment key={index}>
                                                    {image}
                                                    <br />
                                                </React.Fragment>
                                            ))}
                                        </td>
                                        <td className="dataField">{hotel.HOTELCLASS}</td>
                                        <td className="dataField">{hotel.HOTELPRICEPERNIGHT}</td>
                                        <td className="dataField">{hotel.DESTINATIONID}</td>
                                        <td className="dataField">{hotel.TRIPPACKAGEID}</td>
                                        <td className="dataFieldButton">
                                            <div className="optionsMenu">
                                                <div className="buttonContainer">
                                                    <button className="modifyButton" onClick={() => handleModify(hotel.HOTELID)}>Modify</button>
                                                    <button className="deleteButton" onClick={() => handleDelete(hotel.HOTELID)}>Delete</button>
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
                {editMenu && <ModifyHotel closeMenu={setEditMenu} message={setMessage} editableData={editableData} />}
            </div>
        </>
    )
}

export default HotelsDashboardMain
