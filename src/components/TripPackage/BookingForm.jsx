import React from 'react'
import './BookingForm.css'

const BookingForm = () => {
  return (
    <>
    <div className="BookingFormContainer">
      <div className="PriceSection">
        <p id='price'>$5000</p>
        <p id='perPerson'>per person</p>
      </div>
      <div className="tripForms">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
      </div>
    </div>
    </>
  )
}

export default BookingForm
