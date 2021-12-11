import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from "./header/Header"
import Body from "./body/Body"
import Footer from "./footer/Footer"
import UserProfile from "./user/UserProfile"
import UserPass from "./user/UserPass"
import SoonPage from "./rest/SoonPage"
import Error from "./rest/Error"
import HeaderSeller from "./seller/HeaderSeller"
import BodySell from "./seller/BodySell"
import Modal from "./ultis/Modal"
import SingleProduct from "./body/SingleProduct"
import CartPage from "./user/CartPage"
import UserOrder from "./user/UserOrder"
import OrderItem from "./user/OrderItem"
import AdminModal from "./admin/AdminModal"
import Checkout from "./user/Checkout"
import AlreadyOrder from "./shipper/AlreadyOrder"
import About from "./rest/About"

function App() {
  const expire = localStorage.getItem("expire")
  const exp = new Date()
  if (exp.getTime() >= expire) {
    localStorage.removeItem("id")
    localStorage.removeItem("name")
    localStorage.removeItem("username")
    localStorage.removeItem("dateofbirth")
    localStorage.removeItem("email")
    localStorage.removeItem("address")
    localStorage.removeItem("gender")
    localStorage.removeItem("jwt")
    localStorage.removeItem("jwtA")
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
            <Route path='/about'>
              <Header />
              <About />
            </Route>
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
            <Route path='/seller'>
              <HeaderSeller />
              <BodySell />
            </Route>
            <Route path='/shipper'>
              <HeaderSeller />
              <AlreadyOrder />
            </Route>
            <Route path='/cart'>
              <Header />
              <CartPage />
              <Footer />
            </Route>
            <Route path='/checkout'>
              <Header />
              <Checkout />
              <Footer />
            </Route>
            <Route path='/comingsoon'>
              <Header />
              <SoonPage />
              <Footer />
            </Route>
            <Route path='/admin'>
              <AdminModal />
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
