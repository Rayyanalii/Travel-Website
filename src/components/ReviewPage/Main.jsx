import React, { useEffect } from 'react'
import MainReview from './MainReview';

const Main = ({ reviews }) => {

  return (
    <>
      {reviews.map((review, index) => (
        <MainReview key={index} review={review} />
      ))}
    </>
  )
}

export default Main
