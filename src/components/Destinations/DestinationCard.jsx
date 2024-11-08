import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../../pages/Destinations.css';

const DestinationCard = (props) => {
  return (
    <div className="card">
      <Link to={props.url}> {/* Use Link instead of a */}
        <img src={props.imageUrl} alt={props.name} /> {/* Added alt text for accessibility */}
        <h3>{props.name}</h3>
      </Link>
    </div>
  );
}

export default DestinationCard;
