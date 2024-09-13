import { useState } from 'react'
import React from 'react'
import './SearchBar.css'

const SearchBar = () => {
    const [search, setsearch] = useState("")

    const handleChange = (e) => {
        setsearch(e.target.value);
    }

    return (
            <div className="searchBar">
                <input type="search" id="searchBar" placeholder='Destinations' value={search} onChange={handleChange} />
            </div>
    )
}

export default SearchBar
