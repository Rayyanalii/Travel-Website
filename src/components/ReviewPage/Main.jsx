import React, { useEffect } from 'react'
import MainReview from './MainReview';

const Main = ({ reviews }) => {

  return (
    <>
      {reviews && reviews.map((review, index) => (
        <MainReview key={index} review={review} />
      ))}
      {reviews.length == 0 && <p>No Reviews Found</p>}
    </>
  )
}

export default Main
