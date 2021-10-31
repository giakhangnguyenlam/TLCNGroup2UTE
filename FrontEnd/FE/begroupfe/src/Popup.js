import React from "react"
import { useGlobalContext } from "./context"

function Popup({ header, content }) {
  const { setRaise } = useGlobalContext()
  setTimeout(() => setRaise(false), 3000)
  return (
    <div className='app__popup'>
      <div className='popup__wrap'>
        <div className='popup__header'>{header}</div>
        <div className='popup__content'>{content}</div>
      </div>
    </div>
  )
}

export default Popup
