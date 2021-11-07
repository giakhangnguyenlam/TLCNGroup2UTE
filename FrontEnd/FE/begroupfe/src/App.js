import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from "./header/Header"
import Body from "./Body"
import Footer from "./footer/Footer"
import UserProfile from "./user/UserProfile"
import UserPass from "./user/UserPass"
import SoonPage from "./rest/SoonPage"
import Error from "./rest/Error"
import HeaderSeller from "./seller/HeaderSeller"
import BodySell from "./seller/BodySell"
import Modal from "./Modal"
import SingleProduct from "./SingleProduct"
import CartPage from "./CartPage"
import UserOrder from "./user/UserOrder"
import OrderItem from "./user/OrderItem"

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
            <Route path='/product/:id'>
              <Header />
              <SingleProduct />
              <Footer />
            </Route>
            {/* <Route path='/csbm'>
            <SecurityRule />
          </Route> */}
            {/* <Route path='/dkdv'>
            <ServiceRule />
          </Route> */}
            <Route path='/user/order/:orderId'>
              <Header />
              <OrderItem />
              <Footer />
            </Route>
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
            <Route path='/user/order'>
              <Header />
              <UserOrder />
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
            <Route path='/cart'>
              <Header />
              <CartPage />
              <Footer />
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
