import React, { useState } from "react"
import Popup from "../ultis/Popup"
import ItemShipper from "./ItemShipper"
import { useGlobalContext } from "../context"
import { VscRocket } from "react-icons/vsc"
import { AiOutlineDownSquare, AiOutlineTable } from "react-icons/ai"

function BodyShipper() {
  const [load, setLoad] = useState(false)
  const { raise } = useGlobalContext()
  const [shipperPage, setShipperPage] = useState("all")
  const [height, setHeight] = useState(0)
  return (
    <div className='container'>
      <div className='grid'>
        <div className='grid__row contain'>
          <div className='grid__colum-2'>
            <nav style={{ marginBottom: "10px" }}>
              <div
                className={`store-product__header-ctrl${
                  shipperPage === "all" ? "--active" : ""
                }`}
                onClick={() => setShipperPage("all")}
              >
                <p>
                  <AiOutlineTable className='store-item__icon' />
                  Tất cả đơn hàng
                </p>
              </div>
              <div
                className={`store-product__header-ctrl${
                  shipperPage === "receive" ? "--active" : ""
                }`}
                onClick={() => setShipperPage("receive")}
              >
                <p>
                  <VscRocket className='store-item__icon' />
                  Đơn vận chuyển
                </p>
              </div>
              <div
                className={`store-product__header-ctrl${
                  shipperPage === "success" ? "--active" : ""
                }`}
                onClick={() => setShipperPage("success")}
              >
                <p>
                  <AiOutlineDownSquare className='store-item__icon' />
                  Đơn hàng đã giao
                </p>
              </div>
            </nav>
          </div>

          <div className='grid__colum-10'>
            <ItemShipper
              setLoading={setLoad}
              setHeight={setHeight}
              page={shipperPage}
            />
          </div>
        </div>
      </div>

      {load && (
        <div
          className='modal__overlay'
          style={{ zIndex: "5", top: "0", height }}
        >
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

export default BodyShipper
