import { useState, useEffect } from 'react';
import React from 'react';
import AddDestination from './AddDestination';
import '../../pages/AdminDashboard/DestinationDashboard/DestinationDashboard.css';

const DestinationDashboardMain = () => {
    const [addMenu, setAddMenu] = useState(false);
    const [destinations, setDestinations] = useState([]);

    const fetchDestinations = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/get-destinations'); // Adjust the URL to match your API
            const data = await response.json();
            console.log(data);
            setDestinations(data);
        } catch (error) {
            console.error('Error fetching destinations:', error);
        }
    };

    useEffect(() => {
        fetchDestinations();
    }, []);

    function handleAddMenu(e) {
        setAddMenu(!addMenu);
    }
    const handleDelete = async (city) => {
        if (window.confirm(`Are you sure you want to delete the destination: ${city}?`)) {
            try {
                const response = await fetch('http://localhost:3000/api/delete-destination', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ city }), // Send city in the body
                });

                if (response.ok) {
                    // Destination deleted successfully
                    fetchDestinations(); // Reload the destinations
                } else {
                    console.error('Failed to delete destination:', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting destination:', error);
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
                    <div className="allDestinationTableContainer">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Country</th>
                                    <th>Caption</th>
                                    <th>Image URLs</th>
                                    <th>Best Places ID</th>
                                    <th>Best Eat ID</th>
                                    <th>Best Stay ID</th>
                                    <th>Trip ID</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {destinations.map((destination) => (
                                    <tr key={destination.city}>
                                        <td className="dataField">{destination.city}</td>
                                        <td className="dataField">{destination.country}</td>
                                        <td className="dataField">{destination.caption}</td>
                                        <td className="dataField" style={{ whiteSpace: 'pre-wrap' }}>
                                            {destination.first_image_url.join('\n\n')}
                                        </td>
                                        <td className="dataField">{destination.best_places}</td>
                                        <td className="dataField">{destination.best_eats}</td>
                                        <td className="dataField">{destination.best_stays}</td>
                                        <td className="dataField">{destination.trip_packages}</td>
                                        <td className="dataFieldButton">
                                            <div className="optionsMenu">
                                                <div className="buttonContainer">
                                                    <button className="modifyButton" onClick={() => handleModify(destination.city)}>Modify</button>
                                                    <button className="deleteButton" onClick={() => handleDelete(destination.city)}>Delete</button>
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
            </div>
        </>
    );
}

export default DestinationDashboardMain;
