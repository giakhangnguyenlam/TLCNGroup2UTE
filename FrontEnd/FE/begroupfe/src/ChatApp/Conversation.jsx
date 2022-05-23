import React from "react"

function Conversation({ id, img, name, currentChat }) {
  return (
    <div
      className='conversation__wrap'
      style={
        currentChat?.productId === id ? { backgroundColor: "#c3c3c3" } : {}
      }
    >
      <div className='conversation__img'>
        <div
          style={{
            backgroundImage: `url(${img})`,
            width: " 64px",
            paddingTop: " 64px",
            backgroundPosition: " 50%",
            backgroundSize: " contain",
            backgroundRepeat: " no-repeat",
            borderRadius: "50%",
            backgroundColor: "#fff",
          }}
        ></div>
      </div>
      <div className='conversation__name'>{name}</div>
    </div>
  )
}

export default Conversation
