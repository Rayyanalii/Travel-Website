import React from 'react'
import Hero from '../components/Home/Hero'
import Main from '../components/Home/Main'
import Navbar from '../components/Navbar'
import Footer from './../components/General/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Main />
      <Footer />
    </>
  )
}

export default Home
