import React from 'react'
import { useState } from 'react';
import AddTripPackage from './AddTripPackage';


const TripPackageDashboardMain = () => {
    const [addMenu, setAddMenu] = useState(false);

    function handleAddMenu(e) {
        setAddMenu(!addMenu);
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
                                {/* {destinations.map((destination) => (
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
                                ))} */}
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
