import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { useHistory, useLocation } from "react-router"
import { useGlobalContext } from "../context"
import SearchItem from "./SearchItem"

function SearchBar() {
  const { setSearchInfo, body, hot } = useGlobalContext()
  const [valid, setValid] = useState({ state: false, value: "" })
  const [items, setItems] = useState()
  let ref = useRef()
  let ref2 = useRef()
  const history = useHistory()
  let location = useLocation()
  const his = JSON.parse(localStorage.getItem("history")) || []
  const handleSearch = (type) => {
    if (type === "icon") {
      setSearchInfo(ref.current.value)
      if (ref.current.value !== "") {
        his.unshift(ref.current.value)
      }
      while (his.length > 5) {
        his.pop()
      }
      let newHis = []
      newHis = [...new Set(his)]
      localStorage.setItem("history", JSON.stringify(newHis))
    } else {
      ref.current.value = type
      setSearchInfo(type)
    }
    try {
      axios.post("https://utesharecode.herokuapp.com/search", {
        name: ref.current.value,
      })
    } catch (error) {
      console.log("send search data", error)
    }
    ref2.current.style.display = "none"
    setTimeout(() => {
      ref2.current.style = {}
    }, 100)
    if (location !== "/") {
      history.push("/")
    }
  }
  const checkValid = async (e) => {
    // if (e.target.value !== "") {
    setValid({ state: true, value: e.target.value })
    // }
  }

  useEffect(() => {
    const ar = body
      .map((item) => item.name)
      .filter(
        (item, index) =>
          item.toLowerCase().indexOf(valid.value.toLowerCase()) + 1
      )
      .slice(0, body.length > 5 ? 5 : body.length)
    setItems(ar)
  }, [valid.value])

  return (
    <div className='header__search'>
      <div className='header__search-input-warp'>
        <input
          ref={ref}
          type='text'
          className='header__search-input'
          placeholder='Nhập tên sản phẩm để tìm kiếm'
          onChange={checkValid}
          onKeyDown={(e) => e.key === "Enter" && handleSearch("icon")}
        />
        <div className='header__search-history' ref={ref2}>
          <h3 className='header__search-history-heading'>Lịch sử tìm kiếm</h3>
          <ul className='header__search-history-list'>
            {valid.state ? (
              items ? (
                <SearchItem items={items} handleSearch={handleSearch} />
              ) : his.length ? (
                <SearchItem items={his} handleSearch={handleSearch} />
              ) : (
                ""
              )
            ) : (
              <SearchItem items={hot} handleSearch={handleSearch} />
            )}
          </ul>
        </div>
      </div>
      <button
        className='header__search-btn'
        onClick={() => handleSearch("icon")}
      >
        <AiOutlineSearch className='header__search-btn-icon' />
      </button>
    </div>
  )
}

export default SearchBar
