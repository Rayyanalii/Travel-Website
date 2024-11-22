import React, { useEffect } from 'react'
import { useState } from 'react';
import AddTripPackage from './AddTripPackage';


const TripPackageDashboardMain = () => {
    const [addMenu, setAddMenu] = useState(false);
    const [trips, settrips] = useState([]);

    const fetchTrips = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/get-trips');
            const data = await response.json();
            settrips(data);
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    };

    useEffect(() => {
        fetchTrips();

    }, [addMenu])


    function handleAddMenu(e) {
        setAddMenu(true);
    }
    return (
        <>
            <div className="destinationDashboardMainContainerFlexbox">
                <div className="addDestinationContainer">
                    <div className="addDestinationText">
                        <h1>Add New Trip Package</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div className="addDestinationButton">
                        <input type="button" value="+" onClick={handleAddMenu} />
                    </div>
                </div>
                <div className="allDestinationsContainer">
                    <div className="addDestinationText">
                        <h1>All Trip Packages</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div className="allDestinationTableContainer">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>City</th>
                                    <th>DestinationID</th>
                                    <th>Image URL</th>
                                    <th>Duration (days)</th>
                                    <th>Availability</th>
                                    <th>Requirement (Persons)</th>
                                    <th>Price</th>
                                    <th>Accomodation Stars</th>
                                    <th>Destination Stars</th>
                                    <th>Value Stars</th>
                                    <th>Transport Stars</th>
                                    <th>Meals Stars</th>
                                    <th>Overall Stars</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trips.map((trip) => (
                                    <tr key={trip.TRIPPACKAGEID}>
                                        <td className="dataField">{trip.TRIPPACKAGEID}</td>
                                        <td className="dataField">{trip.TITLE}</td>
                                        <td className="dataField">{trip.CITY}</td>
                                        <td className="dataField">{trip.DESTINATIONID}</td>
                                        <td className="dataField">
                                            {trip.IMAGE.split(',').map((image, index) => (
                                                <React.Fragment key={index}>
                                                    {image}
                                                    <br />
                                                </React.Fragment>
                                            ))}
                                        </td>
                                        <td className="dataField">{trip.PACKAGEDURATION}</td>
                                        <td className="dataField">{trip.PACKAGEAVAILABILITY}</td>
                                        <td className="dataField">{trip.PACKAGEREQUIREMENT}</td>
                                        <td className="dataField">{trip.PRICE}</td>
                                        <td className="dataField">{trip.ACCOMODATIONRATING}</td>
                                        <td className="dataField">{trip.DESTINATIONRATING}</td>
                                        <td className="dataField">{trip.VALUERATING}</td>
                                        <td className="dataField">{trip.TRANSPORTRATING}</td>
                                        <td className="dataField">{trip.MEALSRATING}</td>
                                        <td className="dataField">{trip.OVERALLRATING}</td>
                                        <td className="dataFieldButton">
                                            <div className="optionsMenu">
                                                <div className="buttonContainer">
                                                    <button className="modifyButton" onClick={() => handleModify(trip.TRIPPACKAGEID)}>Modify</button>
                                                    <button className="deleteButton" onClick={() => handleDelete(trip.TRIPPACKAGEID)}>Delete</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {addMenu && <AddTripPackage closeMenu={setAddMenu} />}
            </div>
        </>
    )
}

export default TripPackageDashboardMain
