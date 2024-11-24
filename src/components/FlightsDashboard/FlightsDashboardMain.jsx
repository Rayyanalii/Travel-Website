import React, { useEffect, useState } from 'react'

import AddFlight from './AddFlight';

const FlightsDashboardMain = () => {
    const [addMenu, setAddMenu] = useState(false);
    const [flights, setflights] = useState([]);

    const fetchFlights = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/get-flights');
            const data = await response.json();
            setflights(data);
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    };

    useEffect(() => {
        fetchFlights();
    }, [addMenu])

    function handleAddMenu(e) {
        setAddMenu(!addMenu);
    }

    async function handleDelete(id) {
        try {

            const res = await fetch(`http://localhost:3000/api/delete-flight/${id}`, {
                method: 'DELETE',

            })
            if (res.ok) {
                alert('Flight deleted successfully');
                fetchFlights();
            }
            else {
                alert('Error deleting Flight');
            }
        }
        catch (error) {
            console.error('Error deleting Flight:', error);
            alert('Error deleting Flight');
        }
    }

    return (
        <>
            <div className="destinationDashboardMainContainerFlexbox">
                <div className="addDestinationContainer">
                    <div className="addDestinationText">
                        <h1>Add New Flight</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div className="addDestinationButton">
                        <input type="button" value="+" onClick={handleAddMenu} />
                    </div>
                </div>
                <div className="allDestinationsContainer">
                    <div className="addDestinationText">
                        <h1>All Flights</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div className="allDestinationTableContainer">
                        <table>
                            <thead>
                                <tr>
                                    <th>Flight ID</th>
                                    <th>Airline</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Image URL</th>
                                    <th>Departure Date</th>
                                    <th>Available Seats</th>
                                    <th>Seat Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {flights.map((flight) => (
                                    <tr key={flight.FLIGHTID}>
                                        <td className="dataField">{flight.FLIGHTID}</td>
                                        <td className="dataField">{flight.AIRLINE}</td>
                                        <td className="dataField">{flight.FROMCITY}</td>
                                        <td className="dataField">{flight.TOCITY}</td>
                                        <td className="dataField">{flight.IMAGE}</td>
                                        <td className="dataField">{flight.DEPARTUREDATE}</td>
                                        <td className="dataField">{flight.AVAILABLESEATS}</td>
                                        <td className="dataField">{flight.SEATPRICE}</td>
                                        <td className="dataFieldButton">
                                            <div className="optionsMenu">
                                                <div className="buttonContainer">
                                                    <button className="modifyButton" onClick={() => handleModify(flight.FLIGHTID)}>Modify</button>
                                                    <button className="deleteButton" onClick={() => handleDelete(flight.FLIGHTID)}>Delete</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {addMenu && <AddFlight closeMenu={setAddMenu} />}
            </div>
        </>
    )
}

export default FlightsDashboardMain
