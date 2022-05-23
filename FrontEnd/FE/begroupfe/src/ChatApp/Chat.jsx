import axios from "axios"
import { React, useState, useEffect, useRef } from "react"
import { AiOutlineSend } from "react-icons/ai"
import Conversation from "./Conversation"
import Message from "./Message"
// import "../assets/css/chatApp.css"

function Chat() {
  const [conversations, setConversations] = useState([])
  const [message, setMessage] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const scrollRef = useRef()
  const userId = localStorage.getItem("id")

  const msg = [
    {
      _id: "62754a8eb1cedbfbd63697b9",
      conversationId: 2,
      sender: "158",
      text: "Test abcabcaca",
      id: 1,
      __v: 0,
    },
    {
      _id: "62754a8eb1cedbfbd63697b9",
      conversationId: 2,
      sender: "1",
      text: "Test abcabcaca",
      id: 1,
      __v: 0,
    },
    {
      _id: "62754a8eb1cedbfbd63697b9",
      conversationId: 2,
      sender: "158",
      text: "Test abcabcaca",
      id: 1,
      __v: 0,
    },
  ]
  const msg1 = [
    {
      _id: "62754a8eb1cedbfbd63697b9",
      conversationId: 2,
      sender: "158",
      text: "Test abcabcaca",
      id: 1,
      __v: 0,
    },
    {
      _id: "62754a8eb1cedbfbd63697b9",
      conversationId: 2,
      sender: "158",
      text: "Test abcabcaca",
      id: 1,
      __v: 0,
    },
    {
      _id: "62754a8eb1cedbfbd63697b9",
      conversationId: 2,
      sender: "1",
      text: "Test abcabcaca",
      id: 1,
      __v: 0,
    },
    {
      _id: "62754a8eb1cedbfbd63697b9",
      conversationId: 2,
      sender: "1",
      text: "Test abcabcaca",
      id: 1,
      __v: 0,
    },
    {
      _id: "62754a8eb1cedbfbd63697b9",
      conversationId: 2,
      sender: "1",
      text: "Test abcabcaca",
      id: 1,
      __v: 0,
    },
    {
      _id: "62754a8eb1cedbfbd63697b9",
      conversationId: 2,
      sender: "158",
      text: "Test abcabcaca",
      id: 1,
      __v: 0,
    },
    {
      _id: "62754a8eb1cedbfbd63697b9",
      conversationId: 2,
      sender: "158",
      text: "Test abcabcaca",
      id: 1,
      __v: 0,
    },
  ]
  const item = [
    {
      _id: "627400ec7e5d814f9965eae6",
      membersId: [158, 183],
      membersName: ["khang", "khang"],
      productId: 152,
      productName: "áo thể thao",
      productImage:
        "https://drive.google.com/uc?id=1d3r04aRP-li8pG7vXIDjGfN5hzbUgECO&export=download",
      id: 0,
      __v: 0,
    },
    {
      _id: "627401b716a192c5082ead05",
      membersId: [158, 183],
      membersName: ["khang", "khang"],
      productId: 153,
      productName: "áo thể",
      productImage:
        "https://drive.google.com/uc?id=1d3r04aRP-li8pG7vXIDjGfN5hzbUgECO&export=download",
      id: 1,
      __v: 0,
    },
  ]
  useEffect(() => {
    const getConversations = async () => {
      try {
        // const res = await axios.get("/conversations/" + userId);
        // if(res.status === 200){
        //   setConversations(res.data);
        // }
        setConversations(item)
      } catch (err) {
        console.log(err)
      }
    }
    getConversations()
  }, [userId])

  useEffect(() => {
    const getMessages = async () => {
      try {
        // const res = await axios.get("/messages/" + currentChat?._id);
        if (currentChat?.productId == 152) {
          setMessage(msg1)
        } else {
          setMessage(msg)
        }
      } catch (err) {
        console.log(err)
      }
    }
    getMessages()
  }, [currentChat])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [message])

  return (
    <div className='chatapp__wrap'>
      <div className='chatapp__conversation'>
        {conversations.map((item) => (
          <div onClick={() => setCurrentChat(item)}>
            <Conversation
              img={item.productImage}
              name={item.productName}
              id={item.productId}
              currentChat={currentChat}
              key={item.productId}
            />
          </div>
        ))}
      </div>
      <div
        className='chatapp__message'
        style={
          currentChat ? {} : { justifyContent: "center", alignItems: "center" }
        }
      >
        {currentChat ? (
          <>
            <div className='message__main'>
              {message.map((item) => (
                <div ref={scrollRef}>
                  <Message message={item} own={item.sender == userId} />
                </div>
              ))}
            </div>
            <div className='message__send'>
              <div className='message__input-wrap'>
                <div className='message__input'>
                  <div
                    className='message__input-text'
                    role={"textbox"}
                    contentEditable='true'
                  ></div>
                </div>
              </div>
              <AiOutlineSend className='message__send-btn' />
            </div>
          </>
        ) : (
          <span className='noConversationText'>
            Open a conversation to start a chat.
          </span>
        )}
      </div>
    </div>
  )
}

export default Chat
