import React, { useEffect, useState } from 'react'
import Navbar from './../components/Navbar';
import Hero from '../components/ReviewPage/Hero';
import Main from '../components/ReviewPage/Main';
import Footer from './../components/General/Footer';


const Reviews = () => {
  const [reviews, setreviews] = useState([])

  const fetchReviews = async () => {
    const response = await fetch('http://localhost:3000/api/get-reviews');
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      setreviews(data);
    }
  }
  useEffect(() => {
    fetchReviews();

  }, [])


  return (
    <>
      <Navbar />
      <Hero />
      <Main reviews={reviews} />
      <Footer />
    </>
  )
}

export default Reviews
