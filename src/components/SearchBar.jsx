import { useState } from 'react'
import React from 'react'
import './SearchBar.css'

const SearchBar = ({ setsearched, defaultValue, setID }) => {

    const handleChange = (e) => {
        setsearched(e.target.value);
        setID("")
    }

    return (
        <div className="searchBar">
            <input type="search" id="searchBar" placeholder='Destinations' value={defaultValue} onChange={handleChange} required />
        </div>
    )
}

export default SearchBar
