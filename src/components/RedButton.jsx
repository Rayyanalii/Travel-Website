import React from 'react'
import './RedButton.css'

const RedButton = ({ type, review, desc }) => {
  return (
    <>
      <button
        className={review ? 'redbutton button--review' : 'redbutton'}
        type={type}
        aria-label={desc}
      >
        {desc}
      </button>
    </>
  )
}

export default RedButton
