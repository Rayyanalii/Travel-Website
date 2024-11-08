import React, { useEffect, useState } from 'react'
import AddCar from './AddCar';


const CarsDashboardMain = () => {
    const [addMenu, setAddMenu] = useState(false);
    const [cars, setcars] = useState([]);

    const fetchCars = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/get-cars');
            const data = await response.json();
            setcars(data);
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    useEffect(() => {
        fetchCars();
    }, [])


    function handleAddMenu(e) {
        setAddMenu(!addMenu);
    }
    return (
        <>
            <div className="destinationDashboardMainContainerFlexbox">
                <div className="addDestinationContainer">
                    <div className="addDestinationText">
                        <h1>Add New Car</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div className="addDestinationButton">
                        <input type="button" value="+" onClick={handleAddMenu} />
                    </div>
                </div>
                <div className="allDestinationsContainer">
                    <div className="addDestinationText">
                        <h1>All Cars</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div className="allDestinationTableContainer">
                        <table>
                            <thead>
                                <tr>
                                    <th>Car ID</th>
                                    <th>Make</th>
                                    <th>Model</th>
                                    <th>Year</th>
                                    <th>Location</th>
                                    <th>Type</th>
                                    <th>Image URL</th>
                                    <th>Price Per Day</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cars.map((car) => (
                                    <tr key={car.carID}>
                                        <td className="dataField">{car.carID}</td>
                                        <td className="dataField">{car.carMake}</td>
                                        <td className="dataField">{car.carModel}</td>
                                        <td className="dataField">{car.carYear}</td>
                                        <td className="dataField">{car.carLocation}</td>
                                        <td className="dataField">{car.carType}</td>
                                        <td className="dataField">{car.carPrice}</td>
                                        <td className="dataField">{car.carImage}</td>
                                        <td className="dataFieldButton">
                                            <div className="optionsMenu">
                                                <div className="buttonContainer">
                                                    <button className="modifyButton" onClick={() => handleModify(car.carID)}>Modify</button>
                                                    <button className="deleteButton" onClick={() => handleDelete(car.carID)}>Delete</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {addMenu && <AddCar closeMenu={setAddMenu} />}
            </div>
        </>
    )
}

export default CarsDashboardMain
