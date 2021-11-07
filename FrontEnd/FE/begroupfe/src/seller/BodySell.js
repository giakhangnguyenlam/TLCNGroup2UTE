import axios from "axios"
import React, { useState, useEffect } from "react"
import { useGlobalContext } from "../context"
import Popup from "../Popup"

function BodySell() {
  const [storeList, setStoreList] = useState([])
  const jwt = localStorage.getItem("jwt")
  const userid = localStorage.getItem("id")
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
    let del = window.confirm("Delete?")
    if (del) {
      try {
        let res = await axios({
          method: "delete",
          url: `https://tlcngroup2be.herokuapp.com/seller/store/${id}`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (res.status === 200) {
          setReloadSell(!reloadSell)
          setRaise({
            header: "Delete store",
            content: "Delete store success!",
            color: "#4bb534",
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  const handleDetailStore = (store) => {
    setIsDetailStore(true)
    setIdStoreUpdate(store)
  }
  const handleOrderDetail = (store) => {
    setIsOrderDetail(true)
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
    fetchData()
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
                <div className='store__nav-wrap'>
                  <div className='store__nav-options'>
                    <div className='store__nav-tab store__nav-tab--active'>
                      Cửa hàng của tôi
                    </div>
                    <div className='store__nav-tab'>Sản phẩm của tôi</div>
                    <div className='store__nav-tab'>Phản hồi</div>
                  </div>
                </div>
                <div className='store__contain'>
                  <div className='store__contain-wrap'>
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
                              style={{ justifyContent: "center" }}
                            >
                              <button
                                className='product-item__ctrl-btn btn'
                                style={{ width: "80%" }}
                                onClick={() => handleOrderDetail(store)}
                              >
                                Order
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
