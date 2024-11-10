import React, { useState, useEffect } from 'react'
import AddRestaurant from './AddRestaurant'
import ModifyRestaurant from './ModifyRestaurant';

const RestaurantDashboardMain = () => {
    const [addMenu, setAddMenu] = useState(false);
    const [restaurants, setrestaurants] = useState([]);
    const [modifyMenu, setModifyMenu] = useState(false);
    const [editableRestaurant, setEditableRestaurant] = useState([]);
    const [updateMessage, setUpdateMessage] = useState('');

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
        if (updateMessage) {
            const timeoutId = setTimeout(() => {
                setUpdateMessage('');
            }, 2000);

            return () => clearTimeout(timeoutId);
        }
    }, [addMenu, modifyMenu])


    function handleAddMenu(e) {
        setAddMenu(!addMenu);
        setModifyMenu(false);
    }

    async function handleDelete(id) {
        const restaurant = restaurants.find((restaurant) => restaurant.RESTAURANTID === id);
        if (restaurant) {
            const imageUrls = restaurant.RESTAURANTIMAGES.split(',');

            try {

                const res = await fetch(`http://localhost:3000/api/delete-restaurant/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ imageUrls }),
                })
                if (res.ok) {
                    alert('Restaurant and Images deleted successfully');
                    fetchRestaurants();
                }
                else {
                    alert('Error deleting Restaurant');
                }
            }
            catch (error) {
                console.error('Error deleting Restaurant:', error);
                alert('Error deleting Restaurant');
            }
        }
    }

    function handleModify(id) {
        setAddMenu(false);
        setModifyMenu(!modifyMenu);
        const rest = restaurants.find((restaurant) => restaurant.RESTAURANTID === id);
        setEditableRestaurant(rest);
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
                    {updateMessage && <>
                        <div className="success-message">
                            {updateMessage}
                        </div>
                    </>}
                    <div className="allDestinationTableContainer">
                        <table>
                            <thead>
                                <tr>
                                    <th>Restaurant ID</th>
                                    <th>Name</th>
                                    <th>City</th>
                                    <th>Description</th>
                                    <th>Image URLs</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {restaurants.map((restaurant) => (
                                    <tr key={restaurant.RESTAURANTID}>
                                        <td className="dataField">{restaurant.RESTAURANTID}</td>
                                        <td className="dataField">{restaurant.RESTAURANTNAME}</td>
                                        <td className="dataField">{restaurant.RESTAURANTCITY}</td>
                                        <td className="dataField">{restaurant.RESTAURANTDESCRIPTION}</td>
                                        <td className="dataField">
                                            {restaurant.RESTAURANTIMAGES.split(',').map((image, index) => (
                                                <React.Fragment key={index}>
                                                    {image}
                                                    <br />
                                                </React.Fragment>
                                            ))}
                                        </td>
                                        <td className="dataFieldButton">
                                            <div className="optionsMenu">
                                                <div className="buttonContainer">
                                                    <button className="modifyButton" onClick={() => handleModify(restaurant.RESTAURANTID)}>Modify</button>
                                                    <button className="deleteButton" onClick={() => handleDelete(restaurant.RESTAURANTID)}>Delete</button>
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
                {modifyMenu && <ModifyRestaurant closeMenu={setModifyMenu} editData={editableRestaurant} updateMessage={setUpdateMessage} />}
            </div>
        </>
    )
}

export default RestaurantDashboardMain
