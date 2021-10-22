import axios from "axios"
import React, { useState, useEffect } from "react"
import { useGlobalContext } from "./context"

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
  } = useGlobalContext()

  const handleClick = () => {
    setIsCreateStore(!isCreateStore)
  }
  const handleUpdateStore = (id) => {
    setIsUpdateStore(!isUpdateStore)
    setIdStoreUpdate(id)
  }
  const handleDeleteStore = async (id) => {
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
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleDetailStore = (id) => {
    setIsDetailStore(true)
    setIdStoreUpdate(id)
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
                            <a href='' className='product-item'>
                              <div
                                className='product-item__img'
                                style={{
                                  backgroundImage: `url(${image})`,
                                }}
                              ></div>
                              <h4 className='product-item__name'>
                                {nameStore}
                              </h4>
                            </a>
                            <div className='product-item__ctrl'>
                              <button
                                className='product-item__ctrl-btn btn'
                                onClick={() => handleUpdateStore(id)}
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
                                onClick={() => handleDetailStore(id)}
                              >
                                Detail
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
    </div>
  )
}

export default BodySell
