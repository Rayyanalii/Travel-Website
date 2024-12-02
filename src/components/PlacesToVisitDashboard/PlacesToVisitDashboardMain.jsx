import React, { useState, useEffect } from 'react'
import AddPlaceToVisit from './AddPlaceToVisit';
import ModifyPlaceToVisit from './ModifyPlaceToVisit';

const PlacesToVisitDashboardMain = () => {
    const [addMenu, setAddMenu] = useState(false);
    const [placesToVisit, setplacesToVisit] = useState([]);
    const [modifyMenu, setModifyMenu] = useState(false);
    const [editableData, setEditableData] = useState([]);
    const [updateMessage, setUpdateMessage] = useState('');

    const fetchPlacesToVisit = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/get-places-to-visit'); // Adjust the URL to match your API
            const data = await response.json();
            setplacesToVisit(data);
        } catch (error) {
            console.error('Error fetching places to visit:', error);
        }
    };

    useEffect(() => {
        fetchPlacesToVisit();
        if (updateMessage) {
            const timeout = setTimeout(() => {
                setUpdateMessage('');
            }, 2000);

            return () => {
                clearTimeout(timeout);
            }
        }
    }, [addMenu, modifyMenu])


    function handleAddMenu(e) {
        setAddMenu(!addMenu);
    }


    function handleModify(id) {
        setModifyMenu(true);
        const place = placesToVisit.find((place) => place.PLACEID === id);
        setEditableData(place);
    }

    async function handleDelete(id) {
        const place = placesToVisit.find((place) => place.PLACEID === id);
        if (place && window.confirm(`Are you sure you want to delete the place to visit`)) {
            const imageUrls = place.PLACEIMAGES.split(',');

            try {

                const res = await fetch(`http://localhost:3000/api/delete-place-to-visit/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ imageUrls }),
                })
                if (res.ok) {
                    alert('Place and images deleted successfully');
                    fetchPlacesToVisit();  // Refresh the list of places
                }
                else {
                    alert('Error deleting place');
                }
            }
            catch (error) {
                console.error('Error deleting place:', error);
                alert('Error deleting place');
            }
        }
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
                    {updateMessage && <>
                        <div className="success-message">
                            <p>{updateMessage}</p>
                        </div>
                    </>}
                    <div className="allDestinationTableContainer">
                        <table>
                            <thead>
                                <tr>
                                    <th>Place ID</th>
                                    <th>Title</th>
                                    <th>City</th>
                                    <th>Description</th>
                                    <th>Image URLs</th>
                                    <th>Destination ID</th>
                                    <th>Trip Package ID</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {placesToVisit.map((place) => (
                                    <tr key={place.PLACEID}>
                                        <td className="dataField">{place.PLACEID}</td>
                                        <td className="dataField">{place.PLACETITLE}</td>
                                        <td className="dataField">{place.PLACECITY}</td>
                                        <td className="dataField">{place.PLACEDESCRIPTION}</td>
                                        <td className="dataField">
                                            {place.PLACEIMAGES.split(',').map((image, index) => (
                                                <React.Fragment key={index}>
                                                    {image}
                                                    <br />
                                                </React.Fragment>
                                            ))}
                                        </td>
                                        <td className="dataField">{place.DESTINATIONID}</td>
                                        <td className="dataField">{place.TRIPPACKAGEID}</td>
                                        <td className="dataFieldButton">
                                            <div className="optionsMenu">
                                                <div className="buttonContainer">
                                                    <button className="modifyButton" onClick={() => handleModify(place.PLACEID)}>Modify</button>
                                                    <button className="deleteButton" onClick={() => handleDelete(place.PLACEID)}>Delete</button>
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
                {modifyMenu && <ModifyPlaceToVisit closeMenu={setModifyMenu} editableData={editableData} updateMessage={setUpdateMessage} />}
            </div>
        </>
    )
}

export default PlacesToVisitDashboardMain
