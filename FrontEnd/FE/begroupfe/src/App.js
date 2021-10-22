import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import Modal from "./Modal"
import SoonPage from "./SoonPage"
import Error from "./Error"
import Body from "./Body"
import HeaderSeller from "./HeaderSeller"
import BodySell from "./BodySell.js"
import UserProfile from "./UserProfile"
import UserPass from "./UserPass"

function App() {
  const expire = localStorage.getItem("expire")
  const exp = new Date()
  if (exp.getTime() >= expire) {
    localStorage.removeItem("id")
    localStorage.removeItem("name")
    localStorage.removeItem("dateofbirth")
    localStorage.removeItem("email")
    localStorage.removeItem("address")
    localStorage.removeItem("gender")
    localStorage.removeItem("jwt")
    localStorage.removeItem("role")
    localStorage.removeItem("expire")
  }
  return (
    <div>
      <Router>
        <div className='app'>
          <Switch>
            <Route exact path='/'>
              <Header />
              <Body />
              <Footer />
            </Route>
            {/* <Route path='/about'>
            <About />
          </Route> */}
            {/* <Route path='/cocktail/:id'>
            <SingleCocktail />
          </Route> */}
            {/* <Route path='/csbm'>
            <SecurityRule />
          </Route> */}
            {/* <Route path='/dkdv'>
            <ServiceRule />
          </Route> */}
            <Route path='/user/account/profile'>
              <Header />
              <UserProfile />
              <Footer />
            </Route>
            <Route path='/user/account/password'>
              <Header />
              <UserPass />
              <Footer />
            </Route>
            <Route path='/comingsoon'>
              <Header />
              <SoonPage />
              <Footer />
            </Route>
            <Route path='/seller'>
              <HeaderSeller />
              <BodySell />
            </Route>
            <Route path='*'>
              <Header />
              <Error />
              <Footer />
            </Route>
          </Switch>
        </div>
        <Modal />
      </Router>
    </div>
  )
}

export default App
