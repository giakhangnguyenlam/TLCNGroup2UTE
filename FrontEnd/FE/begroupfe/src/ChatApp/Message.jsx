import React from "react"

function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className='messageTop'>
        <p className='messageText'>{message.text}</p>
      </div>
    </div>
  )
}

export default Message
