import { React, useState } from "react"
import "../assets/css/chatApp.css"
import { BsChatQuote } from "react-icons/bs"
import Chat from "./Chat"

function ChatApp() {
  const [isChat, setIsChat] = useState(false)
  return isChat ? (
    <Chat />
  ) : (
    <button className='chatapp__start-btn' onClick={() => setIsChat(true)}>
      <BsChatQuote />
      Chat
    </button>
  )
}

export default ChatApp
