import React, { useEffect, useState } from "react"
import { useGlobalContext } from "../context"
import authImg from "../assets/img/auth.png"
import Login from "../header/Login"
import Signup from "../header/Signup"
function BodyAuth() {
  const [height, setHeight] = useState(0)
  const { loading, auth } = useGlobalContext()
  useEffect(() => {
    let body = document.body,
      html = document.documentElement

    setHeight(
      Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      )
    )
  }, [])
  return (
    <div className='container' style={{ backgroundColor: "rgb(238 77 46)" }}>
      <div className='grid'>
        <div className='body-auth__wrap'>
          <div
            className='body-auth'
            style={{
              backgroundImage: `url(${authImg})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
            }}
          >
            {auth === "login" ? <Login /> : <Signup />}
          </div>
        </div>
      </div>
      {loading && (
        <div
          className='modal__overlay'
          style={{ zIndex: "101", top: "0", height }}
        >
          <div className='loading'>
            <div className='loading__one'></div>
            <div className='loading__two'></div>
            <div className='loading__three'></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BodyAuth
