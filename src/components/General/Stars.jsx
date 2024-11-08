import React from 'react';
import { IoIosStar } from "react-icons/io";
import './General.css'

const Stars = ({ num, onStarClick, isClickable }) => {
  const totalStars = 5;

  return (
    <>
      {Array.from({ length: totalStars }, (_, index) => (
        <IoIosStar
          key={index}
          className={index < num ? 'redtripCardStar' : 'whitetripCardStar'}
          onClick={isClickable ? () => onStarClick(index + 1) : null}
          style={{ cursor: isClickable ? 'pointer' : 'default' }} 
        />
      ))}
    </>
  );
};

export default Stars;
