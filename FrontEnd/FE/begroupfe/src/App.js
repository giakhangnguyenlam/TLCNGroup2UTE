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
