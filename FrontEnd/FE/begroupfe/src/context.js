import React, { useState, useContext } from "react"

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [isCreateStore, setIsCreateStore] = useState(false)
  const [isUpdateStore, setIsUpdateStore] = useState(false)
  const [idStoreUpdate, setIdStoreUpdate] = useState(null)
  const [reloadSell, setReloadSell] = useState(false)
  return (
    <AppContext.Provider
      value={{
        isLogin,
        isSignup,
        reloadSell,
        isCreateStore,
        isUpdateStore,
        idStoreUpdate,
        setIsLogin,
        setIsSignup,
        setReloadSell,
        setIsCreateStore,
        setIsUpdateStore,
        setIdStoreUpdate,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }