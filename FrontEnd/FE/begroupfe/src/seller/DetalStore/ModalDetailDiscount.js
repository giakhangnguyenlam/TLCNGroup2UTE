import axios from "axios"
import React, { useEffect, useState } from "react"
import { AiOutlineSave, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import { ImCancelCircle } from "react-icons/im"
import { useGlobalContext } from "../../context"

function ModalDetailDiscount() {
  const jwt = localStorage.getItem("jwt")
  const { idStoreProd } = useGlobalContext()
  const [discountList, setDiscountList] = useState([])
  const [edit, setEdit] = useState("")
  const [dc, setDc] = useState({
    productId: "",
    couponName: "",
    couponDesc: "",
    discount: "",
    startDate: "",
    expireDate: "",
  })
  const resetDc = () =>
    setDc({
      productId: "",
      couponName: "",
      couponDesc: "",
      discount: "",
      startDate: "",
      expireDate: "",
    })
  const [reload, setReload] = useState(false)

  const dateTrans = (date) => {
    let dateNew = new Date(date)
    return `${dateNew.getFullYear()}-${String(dateNew.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(dateNew.getDate()).padStart(2, "0")}T${String(
      dateNew.getHours()
    ).padStart(2, "0")}:${String(dateNew.getMinutes()).padStart(2, "0")}`
  }

  const handleActive = async (id) => {
    try {
      let res = await axios({
        method: "put",
        url: `https://tlcngroup2be.herokuapp.com/seller/coupon/active/${id}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 200) {
        setReload(!reload)
      }
    } catch (error) {}
  }

  const handleDelete = async (id) => {
    try {
      let res = await axios({
        method: "delete",
        url: `https://tlcngroup2be.herokuapp.com/seller/coupon/${id}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 200) {
        setReload(!reload)
      }
    } catch (error) {}
  }

  const handleUpdate = async (id) => {
    const { couponName, couponDesc, discount, startDate, expireDate } = dc
    try {
      let res = await axios({
        method: "put",
        data: { couponName, couponDesc, discount, startDate, expireDate },
        url: `https://tlcngroup2be.herokuapp.com/seller/coupon/${id}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 200) {
        setEdit("")
        setReload(!reload)
      }
    } catch (error) {}
  }

  const handleEdit = (item) => {
    const {
      couponId,
      couponName,
      couponDesc,
      discount,
      startDate,
      expireDate,
    } = item
    setDc({ ...dc, couponName, couponDesc, discount, startDate, expireDate })
    setEdit(couponId)
  }

  const handleAdd = async () => {
    try {
      let res = await axios({
        method: "post",
        data: { ...dc, productId: idStoreProd.id },
        url: `https://tlcngroup2be.herokuapp.com/seller/coupon`,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 201) {
        resetDc()
        setReload(!reload)
      }
    } catch (error) {}
  }

  const fetchData = async () => {
    try {
      let res = await axios({
        method: "get",
        url: `https://tlcngroup2be.herokuapp.com/seller/coupon/productid/${idStoreProd.id}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 200) {
        setDiscountList(res.data)
      }
    } catch (error) {}
  }
  useEffect(() => {
    fetchData()
  }, [reload])

  return (
    <div className='store'>
      <div className='store-wrap'>
        <div className='store__contain'>
          <div className='store__contain-wrap--enhance'>
            <div className='store__contain-item'>
              <div
                className='store-product__body-item '
                style={{
                  border: "1px solid #979797",
                  fontWeight: "600",
                  height: "40px",
                }}
              >
                <div
                  className='store-item store-item__number'
                  style={{ borderRight: "1px solid #979797" }}
                >
                  ID
                </div>
                <div
                  className='store-item w250x'
                  style={{ borderRight: "1px solid #979797" }}
                >
                  Tên coupon
                </div>
                <div
                  className='store-item w300x'
                  style={{ borderRight: "1px solid #979797" }}
                >
                  Mô tả coupon
                </div>
                <div
                  className='store-item w6'
                  style={{ borderRight: "1px solid #979797" }}
                >
                  %
                </div>
                <div
                  className='store-item  w20'
                  style={{ borderRight: "1px solid #979797" }}
                >
                  Bắt đầu
                </div>
                <div
                  className='store-item  w20'
                  style={{ borderRight: "1px solid #979797" }}
                >
                  Kết thúc
                </div>
                <div className='store-item w10'>Điều khiển</div>
              </div>
            </div>
            <div className='store__contain-item'>
              <div
                className='store-product__body-item '
                style={{
                  border: "1px solid #979797",
                  fontWeight: "600",
                  height: "40px",
                }}
              >
                <div
                  className='store-item store-item__number'
                  style={{ borderRight: "1px solid #979797" }}
                ></div>
                <input
                  type='text'
                  className='store-item w250x'
                  placeholder='tên coupon'
                  onChange={(e) => setDc({ ...dc, couponName: e.target.value })}
                />
                <input
                  type='text'
                  className='store-item w300x'
                  placeholder='mô tả'
                  onChange={(e) => setDc({ ...dc, couponDesc: e.target.value })}
                />
                <input
                  type='number'
                  className='store-item w6'
                  placeholder='%'
                  onChange={(e) => setDc({ ...dc, discount: e.target.value })}
                />
                <input
                  type='datetime-local'
                  className='store-item w20'
                  onChange={(e) =>
                    setDc({
                      ...dc,
                      startDate: new Date(e.target.value).getTime(),
                    })
                  }
                />
                <input
                  type='datetime-local'
                  className='store-item w20'
                  onChange={(e) =>
                    setDc({
                      ...dc,
                      expireDate: new Date(e.target.value).getTime(),
                    })
                  }
                />
                <div className='store-item w10'>
                  <AiOutlineSave
                    className='store-item__info--btn'
                    onClick={handleAdd}
                  />
                </div>
              </div>
            </div>
            {discountList.map((item, index) => {
              return (
                <div className='store__contain-item' key={item.couponId}>
                  <div
                    className='store-product__body-item '
                    style={{
                      border: "1px solid #979797",
                      fontWeight: "600",
                      height: "40px",
                    }}
                  >
                    <div
                      className='store-item store-item__number'
                      style={{ borderRight: "1px solid #979797" }}
                    >
                      <div
                        className={`store-item__state ${
                          item.isActive
                            ? "store-item__state--active"
                            : "store-item__state--disable"
                        }`}
                        onClick={() => handleActive(item.couponId)}
                      ></div>
                    </div>
                    <input
                      type='text'
                      className='store-item w250x'
                      placeholder='tên coupon'
                      value={
                        edit === item.couponId ? dc.couponName : item.couponName
                      }
                      onChange={(e) =>
                        setDc({ ...dc, couponName: e.target.value })
                      }
                      disabled={edit === item.couponId ? "" : "disabled"}
                    />
                    <input
                      type='text'
                      className='store-item w300x'
                      placeholder='mô tả'
                      value={
                        edit === item.couponId ? dc.couponDesc : item.couponDesc
                      }
                      onChange={(e) =>
                        setDc({ ...dc, couponDesc: e.target.value })
                      }
                      disabled={edit === item.couponId ? "" : "disabled"}
                    />
                    <input
                      type='text'
                      className='store-item w6'
                      placeholder='tỉ lệ giảm'
                      value={
                        edit === item.couponId ? dc.discount : item.discount
                      }
                      onChange={(e) =>
                        setDc({ ...dc, discount: e.target.value })
                      }
                      disabled={edit === item.couponId ? "" : "disabled"}
                    />
                    <input
                      type='datetime-local'
                      className='store-item w20'
                      value={
                        edit === item.couponId
                          ? dateTrans(dc.startDate)
                          : dateTrans(item.startDate)
                      }
                      onChange={(e) =>
                        setDc({
                          ...dc,
                          startDate: new Date(e.target.value).getTime(),
                        })
                      }
                      disabled={edit === item.couponId ? "" : "disabled"}
                    />
                    <input
                      type='datetime-local'
                      className='store-item w20'
                      value={
                        edit === item.couponId
                          ? dateTrans(dc.expireDate)
                          : dateTrans(item.expireDate)
                      }
                      onChange={(e) =>
                        setDc({
                          ...dc,
                          startDate: new Date(e.target.value).getTime(),
                        })
                      }
                      disabled={edit === item.couponId ? "" : "disabled"}
                    />
                    <div className='store-item w10'>
                      {edit === item.couponId ? (
                        <ImCancelCircle
                          className='store-item__info--btn'
                          onClick={() => setEdit("")}
                        />
                      ) : (
                        <AiOutlineDelete
                          className='store-item__info--btn'
                          onClick={() => handleDelete(item.couponId)}
                        />
                      )}
                      {edit === item.couponId ? (
                        <AiOutlineSave
                          className='store-item__info--btn'
                          onClick={() => handleUpdate(item.couponId)}
                        />
                      ) : (
                        <AiOutlineEdit
                          className='store-item__info--btn'
                          onClick={() => handleEdit(item)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalDetailDiscount
