import React from "react"

function SearchItem({ items, handleSearch }) {
  return (
    <>
      {items.map((item, index) => {
        return (
          <li
            className='header__search-history-item'
            key={index}
            onClick={() => handleSearch(item)}
          >
            <div>{item}</div>
          </li>
        )
      })}
    </>
  )
}

export default SearchItem
