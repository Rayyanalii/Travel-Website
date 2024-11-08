import React, { useState, useEffect } from 'react'
import AddRestaurant from './AddRestaurant'

const RestaurantDashboardMain = () => {
    const [addMenu, setAddMenu] = useState(false);
    const [restaurants, setrestaurants] = useState([]);

    const fetchRestaurants = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/get-restaurants'); // Adjust the URL to match your API
            const data = await response.json();
            setrestaurants(data);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, [])


    function handleAddMenu(e) {
        setAddMenu(!addMenu);
    }

    return (
        <>
            <div className="destinationDashboardMainContainerFlexbox">
                <div className="addDestinationContainer">
                    <div className="addDestinationText">
                        <h1>Add Restaurant</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div className="addDestinationButton">
                        <input type="button" value="+" onClick={handleAddMenu} />
                    </div>
                </div>
                <div className="allDestinationsContainer">
                    <div className="addDestinationText">
                        <h1>All Restaurants / Places to Eat</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div className="allDestinationTableContainer">
                        <table>
                            <thead>
                                <tr>
                                    <th>Restaurant ID</th>
                                    <th>Name</th>
                                    <th>City</th>
                                    <th>Description</th>
                                    <th>Image URLs</th>
                                </tr>
                            </thead>
                            <tbody>
                                {restaurants.map((restaurant) => (
                                    <tr key={restaurant.restaurantID}>
                                        <td className="dataField">{restaurant.restaurantID}</td>
                                        <td className="dataField">{restaurant.restaurantName}</td>
                                        <td className="dataField">{restaurant.restaurantCity}</td>
                                        <td className="dataField">{restaurant.restaurantDescription}</td>
                                        <td className="dataField">{restaurant.restaurantImages}</td>
                                        <td className="dataFieldButton">
                                            <div className="optionsMenu">
                                                <div className="buttonContainer">
                                                    <button className="modifyButton" onClick={() => handleModify(restaurant.restaurantID)}>Modify</button>
                                                    <button className="deleteButton" onClick={() => handleDelete(restaurant.restaurantID)}>Delete</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {addMenu && <AddRestaurant closeMenu={setAddMenu} />}
            </div>
        </>
    )
}

export default RestaurantDashboardMain
