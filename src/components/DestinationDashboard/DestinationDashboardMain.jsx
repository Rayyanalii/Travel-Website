import { useState, useEffect } from 'react';
import React from 'react';
import AddDestination from './AddDestination';
import '../../pages/AdminDashboard/DestinationDashboard/DestinationDashboard.css';
import ModifyDestinations from './ModifyDestinations';

const DestinationDashboardMain = () => {
    const [addMenu, setAddMenu] = useState(false);
    const [destinations, setDestinations] = useState([]);
    const [editMenu, setEditMenu] = useState(false);
    const [editableData, setEditableData] = useState([]);
    const [message, setMessage] = useState('');

    const fetchDestinations = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/get-destinations'); // Adjust the URL to match your API
            const data = await response.json();
            setDestinations(data);
        } catch (error) {
            console.error('Error fetching destinations:', error);
        }
    };

    useEffect(() => {
        fetchDestinations();
        const timer = setTimeout((i) => {
            setMessage('');
        }, 2000);
    }, [addMenu, editMenu]);

    function handleAddMenu(e) {
        setAddMenu(!addMenu);
    }
    const handleModify = (id) => {
        const dest = destinations.find((dest) => dest.DESTINATIONID === id);
        if (dest) {
            setEditableData(dest);
            setEditMenu(true);
        }
    };
    const handleDelete = async (id) => {
        const destination = destinations.find((destination) => destination.DESTINATIONID == id);
        if (destination && window.confirm(`Are you sure you want to delete the destination`)) {
            const oldImages = destination.IMAGES.split(",");
            try {

                const res = await fetch(`http://localhost:3000/api/delete-destination/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ oldImages }),
                })
                if (res.ok) {
                    alert('Destination deleted successfully');
                    fetchDestinations();
                }
                else {
                    alert('Error deleting Destination:');
                }
            }
            catch (error) {
                console.error('Error deleting Destination:', error);
                alert('Error deleting Destination');
            }
        }

    };


    return (
        <>
            <div className="destinationDashboardMainContainerFlexbox">
                <div className="addDestinationContainer">
                    <div className="addDestinationText">
                        <h1>Add New Destination</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div className="addDestinationButton">
                        <input type="button" value="+" onClick={handleAddMenu} />
                    </div>
                </div>
                <div className="allDestinationsContainer">
                    <div className="addDestinationText">
                        <h1>All Destinations</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    {message && <>
                        <div className="success-message">
                            <p>{message}</p>
                        </div>
                    </>}
                    <div className="allDestinationTableContainer">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>City</th>
                                    <th>Country</th>
                                    <th>Caption</th>
                                    <th>Image URLs</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {destinations.map((destination) => (
                                    <tr key={destination.city}>
                                        <td className="dataField">{destination.DESTINATIONID}</td>
                                        <td className="dataField">{destination.CITY}</td>
                                        <td className="dataField">{destination.COUNTRY}</td>
                                        <td className="dataField">{destination.CAPTION}</td>
                                        <td className="dataField">
                                            {destination.IMAGES.split(',').map((image, index) => (
                                                <React.Fragment key={index}>
                                                    {image}
                                                    <br />
                                                </React.Fragment>
                                            ))}
                                        </td>
                                        <td className="dataFieldButton">
                                            <div className="optionsMenu">
                                                <div className="buttonContainer">
                                                    <button className="modifyButton" onClick={() => handleModify(destination.DESTINATIONID)}>Modify</button>
                                                    <button className="deleteButton" onClick={() => handleDelete(destination.DESTINATIONID)}>Delete</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {addMenu && <AddDestination closeMenu={setAddMenu} />}
                {editMenu && <ModifyDestinations closeMenu={setEditMenu} editableData={editableData} setmessage={setMessage} />}
            </div>
        </>
    );
}

export default DestinationDashboardMain;
