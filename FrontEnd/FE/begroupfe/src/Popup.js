import React from "react"
import { useGlobalContext } from "./context"

function Popup({ header, content, color }) {
  const { setRaise } = useGlobalContext()
  setTimeout(() => setRaise(false), 3000)
  return (
    <div className='app__popup' style={{ backgroundColor: color }}>
      <div className='popup__wrap'>
        <div className='popup__header'>{header}</div>
        <div className='popup__content'>{content}</div>
      </div>
    </div>
  )
}

export default Popup
