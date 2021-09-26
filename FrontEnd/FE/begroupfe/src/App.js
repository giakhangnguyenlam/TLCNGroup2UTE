import { React, useState } from 'react'
import Navbar from './Navbar'
import Signup from './Signup'
import Login from './Login'

function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [isSignup, setIsSignup] = useState(false)

  return (
    <div>
      <div className='app'>
        <header className='header'>
          <div className='grid'>
            <Navbar
              isLogin={isLogin}
              isSignup={isSignup}
              setIsLogin={setIsLogin}
              setIsSignup={setIsSignup}
            />
          </div>
        </header>
      </div>
      {isSignup && (
        <Signup
          isLogin={isLogin}
          isSignup={isSignup}
          setIsLogin={setIsLogin}
          setIsSignup={setIsSignup}
        />
      )}
      {isLogin && (
        <Login
          isLogin={isLogin}
          isSignup={isSignup}
          setIsLogin={setIsLogin}
          setIsSignup={setIsSignup}
        />
      )}
    </div>
  )
}

export default App
