import React from 'react'
import '../../pages/AdminDashboard/ReviewsDashboard/ReviewsDashboard.css'
import { useState, useEffect } from 'react';

const ReviewDashboardMain = () => {

    const [reviews, setReviews] = useState([]);

    const grant = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/grant-access'); // Adjust the URL to match your API
            if (response.ok) {
                console.log("HELLO");

            }

        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/get-reviews'); // Adjust the URL to match your API
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            setReviews(data);

        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    useEffect(() => {
        grant();
        fetchReviews();
    }, []);


    const handleDelete = async (review) => {
        if (window.confirm(`Are you sure you want to delete the review`)) {
            try {
                const response = await fetch('http://localhost:3000/api/delete-review', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ review }),
                });

                if (response.ok) {
                    setReviews((prevReviews) =>
                        prevReviews.filter(rev => rev.REVIEWID !== review) // Use the passed reviewID
                    );
                } else {
                    console.error('Failed to delete review:', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting review:', error);
            }
        }
    };
    return (
        <>
            <div className="destinationDashboardMainContainerFlexbox">
                <div className="allReviewsContainer">
                    <div className="addDestinationText">
                        <h1>All Reviews</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div className="allDestinationTableContainer">
                        <table>
                            <thead>
                                <tr>
                                    <th>UserID</th>
                                    <th>Username</th>
                                    <th>Package Name</th>
                                    <th>Comments</th>
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
                                {reviews.map((review) => (
                                    <tr key={review.REVIEWID}>
                                        <td className="dataField">{review.USERID}</td>
                                        <td className="dataField">{review.USERNAME}</td>
                                        <td className="dataField">{review.PACKAGENAME}</td>
                                        <td className="dataField">
                                            {review.COMMENTS}
                                        </td>
                                        <td className="dataField">{review.ACCOMMODATIONSTARS}</td>
                                        <td className="dataField">{review.DESTINATIONSTARS}</td>
                                        <td className="dataField">{review.VALUESTARS}</td>
                                        <td className="dataField">{review.TRANSPORTSTARS}</td>
                                        <td className="dataField">{review.MEALSSTARS}</td>
                                        <td className="dataField">{review.OVERALLSTARS}</td>
                                        <td className="dataFieldButton">
                                            <div className="optionsMenu">
                                                <div className="buttonContainer">
                                                    <button className="modifyButton" onClick={() => handleModify(review.REVIEWID)}>Modify</button>
                                                    <button className="deleteButton" onClick={() => handleDelete(review.REVIEWID)}>Delete</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewDashboardMain
