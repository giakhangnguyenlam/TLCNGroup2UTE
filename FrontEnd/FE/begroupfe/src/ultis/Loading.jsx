import React from "react"

function Loading() {
  return (
    <div className='modal__overlay' style={{ zIndex: "6" }}>
      <div className='loading'>
        <div className='loading__one'></div>
        <div className='loading__two'></div>
        <div className='loading__three'></div>
      </div>
    </div>
  )
}

export default Loading
