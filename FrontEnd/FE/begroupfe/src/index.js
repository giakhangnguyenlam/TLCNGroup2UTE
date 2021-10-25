import React from "react"
import ReactDOM from "react-dom"
import "normalize.css"
import "./assets/css/base.css"
import "./assets/css/main.css"
import App from "./App"
import { AppProvider } from "./context"

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
