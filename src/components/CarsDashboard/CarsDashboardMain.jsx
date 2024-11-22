import React, { useEffect, useState } from 'react'
import AddCar from './AddCar';
import ModifyCar from './ModifyCar';


const CarsDashboardMain = () => {
    const [addMenu, setAddMenu] = useState(false);
    const [cars, setcars] = useState([]);
    const [editMenu, setEditMenu] = useState(false);
    const [editableData, setEditableData] = useState([]);
    const [message, setMessage] = useState('');

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
        const timer = setTimeout((i) => {
            setMessage('');
        }, 2000);
    }, [addMenu, editMenu])


    function handleAddMenu(e) {
        setAddMenu(!addMenu);
    }

    async function handleDelete(id) {
        const car = cars.find((car) => car.CARID == id);
        if (car) {
            const oldImages = car.CARIMAGE.split(",");
            try {

                const res = await fetch(`http://localhost:3000/api/delete-car/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ oldImages }),
                })
                if (res.ok) {
                    alert('Car deleted successfully');
                    fetchCars();
                }
                else {
                    alert('Error deleting Car');
                }
            }
            catch (error) {
                console.error('Error deleting Car:', error);
                alert('Error deleting Car');
            }
        }

    }

    function handleModify(id) {
        const car = cars.find((car) => car.CARID === id);
        if (car) {
            setEditableData(car);
            setEditMenu(true);
        }
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
                    {message && <>
                        <div className="success-message">
                            <p>{message}</p>
                        </div>
                    </>}
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
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cars.map((car) => (
                                    <tr key={car.CARID}>
                                        <td className="dataField">{car.CARID}</td>
                                        <td className="dataField">{car.CARMAKE}</td>
                                        <td className="dataField">{car.CARMODEL}</td>
                                        <td className="dataField">{car.CARYEAR}</td>
                                        <td className="dataField">{car.CARLOCATION}</td>
                                        <td className="dataField">{car.CARTYPE}</td>
                                        <td className="dataField">{car.CARIMAGE}</td>
                                        <td className="dataField">{car.CARPRICE}</td>
                                        <td className="dataFieldButton">
                                            <div className="optionsMenu">
                                                <div className="buttonContainer">
                                                    <button className="modifyButton" onClick={() => handleModify(car.CARID)}>Modify</button>
                                                    <button className="deleteButton" onClick={() => handleDelete(car.CARID)}>Delete</button>
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
                {editMenu && <ModifyCar closeMenu={setEditMenu} editableData={editableData} message={setMessage} />}
            </div>
        </>
    )
}

export default CarsDashboardMain
