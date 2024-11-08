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
    }, [])

    function handleAddMenu(e) {
        setAddMenu(!addMenu);
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
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {flights.map((flight) => (
                                    <tr key={flight.flightID}>
                                        <td className="dataField">{flight.flightID}</td>
                                        <td className="dataField">{flight.airline}</td>
                                        <td className="dataField">{flight.fromCity}</td>
                                        <td className="dataField">{flight.toCity}</td>
                                        <td className="dataField">{flight.image}</td>
                                        <td className="dataField">{flight.departureDate}</td>
                                        <td className="dataField">{flight.availableSeats}</td>
                                        <td className="dataField">{flight.seatPrice}</td>
                                        <td className="dataFieldButton">
                                            <div className="optionsMenu">
                                                <div className="buttonContainer">
                                                    <button className="modifyButton" onClick={() => handleModify(flight.flightID)}>Modify</button>
                                                    <button className="deleteButton" onClick={() => handleDelete(flight.flightID)}>Delete</button>
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
