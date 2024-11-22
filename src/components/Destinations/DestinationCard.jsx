import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../../pages/Destinations.css';

const DestinationCard = ({ url, imageUrl, name }) => {

  return (
    <div className="card">
      <Link to={url}> {/* Use Link instead of a */}
        <img src={imageUrl} alt={name} /> {/* Added alt text for accessibility */}
        <h3>{name}</h3>
      </Link>
    </div>
  );
}

export default DestinationCard;
