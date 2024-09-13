import React from 'react'
import './SearchBar.css'

const SearchBar = () => {
    return (
        <div>
            <div className="searchBar">
                <input type="search" name="searched" id="searchBar" placeholder='Destinations' />
            </div>
        </div>
    )
}

export default SearchBar
