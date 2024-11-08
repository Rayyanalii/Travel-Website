import React, { useState, useEffect } from 'react'
import AddPlaceToVisit from './AddPlaceToVisit';

const PlacesToVisitDashboardMain = () => {
    const [addMenu, setAddMenu] = useState(false);
    const [placesToVisit, setplacesToVisit] = useState([]);

    const fetchPlacesToVisit = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/get-places-to-visit'); // Adjust the URL to match your API
            const data = await response.json();
            console.log(data);
            setplacesToVisit(data);
        } catch (error) {
            console.error('Error fetching places to visit:', error);
        }
    };

    useEffect(() => {
        fetchPlacesToVisit();
    }, [])


    function handleAddMenu(e) {
        setAddMenu(!addMenu);
    }

    return (
        <>
            <div className="destinationDashboardMainContainerFlexbox">
                <div className="addDestinationContainer">
                    <div className="addDestinationText">
                        <h1>Add New Places To Visit</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div className="addDestinationButton">
                        <input type="button" value="+" onClick={handleAddMenu} />
                    </div>
                </div>
                <div className="allDestinationsContainer">
                    <div className="addDestinationText">
                        <h1>All Places To Visit</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div className="allDestinationTableContainer">
                        <table>
                            <thead>
                                <tr>
                                    <th>Place ID</th>
                                    <th>Title</th>
                                    <th>City</th>
                                    <th>Description</th>
                                    <th>Image URLs</th>
                                </tr>
                            </thead>
                            <tbody>
                                {placesToVisit.map((place) => (
                                    <tr key={place.placeID}>
                                        <td className="dataField">{place.placeID}</td>
                                        <td className="dataField">{place.placeTitle}</td>
                                        <td className="dataField">{place.placeCity}</td>
                                        <td className="dataField">{place.placeDescription}</td>
                                        <td className="dataField">{place.placeImages}</td>
                                        <td className="dataFieldButton">
                                            <div className="optionsMenu">
                                                <div className="buttonContainer">
                                                    <button className="modifyButton" onClick={() => handleModify(place.placeID)}>Modify</button>
                                                    <button className="deleteButton" onClick={() => handleDelete(place.placeID)}>Delete</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {addMenu && <AddPlaceToVisit closeMenu={setAddMenu} />}
            </div>
        </>
    )
}

export default PlacesToVisitDashboardMain
