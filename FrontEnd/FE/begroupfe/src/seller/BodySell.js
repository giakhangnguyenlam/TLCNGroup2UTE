import axios from "axios"
import React, { useState, useEffect } from "react"
import { useHistory } from "react-router"
import { useGlobalContext } from "../context"
import Popup from "../ultis/Popup"

function BodySell() {
  const [storeList, setStoreList] = useState()
  const jwt = localStorage.getItem("jwt")
  const userid = localStorage.getItem("id")
  const history = useHistory()
  const {
    isCreateStore,
    setIsCreateStore,
    isUpdateStore,
    setIsUpdateStore,
    setIdStoreUpdate,
    reloadSell,
    setReloadSell,
    setIsDetailStore,
    setIsOrderDetail,
    setIsStatic,
    loading,
    setLoading,
    raise,
    setRaise,
  } = useGlobalContext()

  const handleClick = () => {
    setIsCreateStore(!isCreateStore)
  }
  const handleUpdateStore = (store) => {
    setIsUpdateStore(!isUpdateStore)
    setIdStoreUpdate(store)
  }
  const handleDeleteStore = async (id) => {
    let del = window.confirm("Bạn muốn xóa cửa hàng chứ?")
    if (del) {
      setLoading(true)
      try {
        let res = await axios({
          method: "delete",
          url: `https://tlcngroup2be.herokuapp.com/seller/store/${id}`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (res.status === 200) {
          setLoading(false)
          setReloadSell(!reloadSell)
          setRaise({
            header: "Xóa cửa hàng",
            content: "Xóa thành công!",
            color: "#4bb534",
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  const handleDetailStore = (store) => {
    // setIdStoreUpdate(store)
    history.push(`/seller/store/${store.id}`)
  }
  const handleOrderDetail = (store) => {
    setIsOrderDetail(true)
    setIdStoreUpdate(store)
  }
  const handleStatic = (store) => {
    setIsStatic(true)
    setIdStoreUpdate(store)
  }

  const fetchData = () => {
    axios({
      method: "get",
      url: `https://tlcngroup2be.herokuapp.com/seller/store/userid/${userid}`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      responseType: "json",
    }).then((res) => {
      setStoreList(res.data)
    })
  }

  useEffect(() => {
    if (localStorage.getItem("role") === "ROLE_SELLER") {
      fetchData()
    } else {
      history.push("/")
    }
  }, [reloadSell])

  return (
    <div className='container'>
      <div className='grid' style={{ overflow: "hidden" }}>
        <div className='option-store-wrap'>
          <div className='option-store' onClick={handleClick}>
            +<p>Create store</p>
          </div>
        </div>

        <div className='grid__row'>
          <div className='grid__colum-12'>
            <div className='store'>
              <div className='store-wrap'>
                <div className='store__contain'>
                  <div
                    className='store__contain-wrap'
                    style={{ minHeight: "810px" }}
                  >
                    {storeList ? (
                      storeList.length ? (
                        <div className='store__contain-item'>
                          {storeList.map((store) => {
                            const { id, image, nameStore } = store
                            return (
                              <div className='grid__colum-2-4' key={id}>
                                <div className='product-item'>
                                  <div
                                    className='product-item__img'
                                    style={{
                                      backgroundImage: `url(${image})`,
                                    }}
                                  ></div>
                                  <h4 className='product-item__name'>
                                    {nameStore}
                                  </h4>
                                </div>
                                <div className='product-item__ctrl'>
                                  <button
                                    className='product-item__ctrl-btn btn'
                                    onClick={() => handleUpdateStore(store)}
                                  >
                                    Update
                                  </button>
                                  <button
                                    className='product-item__ctrl-btn btn'
                                    onClick={() => handleDeleteStore(id)}
                                  >
                                    Delete
                                  </button>
                                  <button
                                    className='product-item__ctrl-btn btn'
                                    onClick={() => handleDetailStore(store)}
                                  >
                                    Detail
                                  </button>
                                </div>
                                <div
                                  className='product-item__ctrl'
                                  style={{ justifyContent: "space-between" }}
                                >
                                  <button
                                    className='product-item__ctrl-btn btn'
                                    style={{ width: "48%" }}
                                    onClick={() => handleOrderDetail(store)}
                                  >
                                    Order
                                  </button>
                                  <button
                                    className='product-item__ctrl-btn btn'
                                    style={{ width: "48%" }}
                                    onClick={() => handleStatic(store)}
                                  >
                                    Static
                                  </button>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        <div className='store__contain-loading'>
                          Chưa có cửa hàng
                        </div>
                      )
                    ) : (
                      <div className='store__contain-loading'>Loading...</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div className='modal__overlay' style={{ zIndex: "2", top: "0" }}>
          <div className='loading'>
            <div className='loading__one'></div>
            <div className='loading__two'></div>
            <div className='loading__three'></div>
          </div>
        </div>
      )}
      {raise && (
        <Popup
          header={raise.header}
          content={raise.content}
          color={raise.color}
        />
      )}
    </div>
  )
}

export default BodySell
