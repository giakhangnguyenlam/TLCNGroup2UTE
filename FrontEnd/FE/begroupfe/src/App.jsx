import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from "./header/Header"
import HeaderAuth from "./header/HeaderAuth"
import BodyAuth from "./body/BodyAuth"
import Body from "./body/Body"
import Footer from "./footer/Footer"
import SoonPage from "./rest/SoonPage"
import Error from "./rest/Error"
import HeaderSeller from "./seller/HeaderSeller"
import BodySell from "./seller/BodySell"
import Modal from "./ultis/Modal"
import SingleProduct from "./body/SingleProduct"
import CartPage from "./user/CartPage"
import OrderItem from "./user/OrderItem"
import Checkout from "./user/Checkout"
import BodyShipper from "./shipper/BodyShipper"
import About from "./rest/About"
import DetailStore from "./seller/DetailStore"
import FooterSeller from "./seller/FooterSeller"
import Headeradmin from "./admin/Headeradmin"
import AdminBody from "./admin/Adminbody"
import AdminLogin from "./admin/AdminLogin"
import UserControl from "./user/UserControl"

function App() {
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
              <Footer />
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
            <Route path='/user/auth'>
              <HeaderAuth />
              <BodyAuth />
              <Footer />
            </Route>
            <Route path='/user/setting'>
              <Header />
              <UserControl />
              <Footer />
            </Route>
            <Route path='/seller/store/:storeId'>
              <HeaderSeller />
              <DetailStore />
              <FooterSeller />
            </Route>
            <Route path='/seller/store'>
              <HeaderSeller />
              <BodySell />
              <FooterSeller />
            </Route>
            <Route path='/shipper'>
              <HeaderSeller />
              <BodyShipper />
              <FooterSeller />
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
            <Route path='/admin/auth'>
              <AdminLogin />
            </Route>
            <Route path='/admin'>
              <Headeradmin />
              <AdminBody />
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
