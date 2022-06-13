import axios from "axios"
import React, { useEffect, useState } from "react"
import { AiOutlineSave, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import { ImCancelCircle } from "react-icons/im"
import { useGlobalContext } from "../../context"
import Switch from "react-switch"

function ModalDetailDiscount({ setLoad }) {
  const jwt = localStorage.getItem("jwt")
  const { setRaise } = useGlobalContext()
  const [discountList, setDiscountList] = useState([])
  const [isCheck, setIsCheck] = useState([])
  const [isFetch, setIsFetch] = useState(false)
  const [edit, setEdit] = useState("")
  const [dc, setDc] = useState({
    couponName: "",
    couponDesc: "",
    discount: "",
    startDate: "",
    expireDate: "",
  })
  const resetDc = () =>
    setDc({
      couponName: "",
      couponDesc: "",
      discount: "",
      startDate: "",
      expireDate: "",
    })

  const [reload, setReload] = useState(false)

  const handleChange = (item, e) => {
    if (e) {
      handleEdit(item)
    } else {
      handleActive(item.couponId)
    }
  }

  const checkData = (type) => {
    for (var key in dc) {
      if (dc[key] === null || dc[key] === "") {
        setRaise({
          header: "Lỗi thông tin",
          content: "Bạn cần điền đủ thông tin",
          color: "#cf000fcc",
        })
        return false
      }
    }
    const current = new Date().getMilliseconds()
    if (type === "create") {
      if (dc.startDate < current) {
        setRaise({
          header: "Lỗi thông tin",
          content: "Thời gian không hợp lệ",
          color: "#cf000fcc",
        })
        return false
      }
    }
    if (type === "update") {
      if (dc.expireDate < current) {
        setRaise({
          header: "Lỗi thông tin",
          content: "Thời gian không hợp lệ",
          color: "#cf000fcc",
        })
        return false
      }
    }
    if (dc.startDate >= dc.expireDate) {
      setRaise({
        header: "Lỗi thông tin",
        content: "Thời gian không hợp lệ",
        color: "#cf000fcc",
      })
      return false
    }
    return true
  }

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
    let del = window.confirm("Bạn muốn tắt coupon?")
    if (del) {
      setLoad(true)
      try {
        let res = await axios({
          method: "put",
          url: `https://tlcngroup2be.herokuapp.com/seller/coupon/active/${id}`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (res.status === 200) {
          setLoad(false)
          setReload(!reload)
          setRaise({
            header: "Mã giảm giá",
            content: "Đổi trạng thái thành công",
            color: "#009944cc",
          })
        }
      } catch (error) {
        setLoad(false)
      }
    }
    setLoad(false)
  }

  const handleDelete = async (id) => {
    let del = window.confirm("Bạn muốn xóa cửa hàng chứ?")
    if (del) {
      setLoad(true)
      try {
        let res = await axios({
          method: "delete",
          url: `https://tlcngroup2be.herokuapp.com/seller/coupon/${id}`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (res.status === 200) {
          setLoad(false)
          setReload(!reload)
          setRaise({
            header: "XMã giảm giá",
            content: "Xóa thành công",
            color: "#009944cc",
          })
        }
      } catch (error) {
        setLoad(false)
      }
    }
    setLoad(false)
  }

  const handleUpdate = async (id) => {
    setLoad(true)
    if (checkData("update")) {
      try {
        let res = await axios({
          method: "put",
          data: dc,
          url: `https://tlcngroup2be.herokuapp.com/seller/coupon/${id}`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (res.status === 200) {
          setLoad(false)
          setEdit("")
          setReload(!reload)
          setRaise({
            header: "Mã giảm giá",
            content: "Thay đổi thành công",
            color: "#009944cc",
          })
        }
      } catch (error) {
        setLoad(false)
        console.log("modal detail discount", error)
      }
    }
    setLoad(false)
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
    const id = window.location.pathname.split("/")[3] || -1
    setLoad(true)
    if (checkData("create")) {
      try {
        let res = await axios({
          method: "post",
          data: { ...dc, productId: id },
          url: `https://tlcngroup2be.herokuapp.com/seller/coupon`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (res.status === 201) {
          setLoad(false)
          resetDc()
          setReload(!reload)
          setRaise({
            header: "Mã giảm giá",
            content: "Thêm thành công",
            color: "#009944cc",
          })
        }
      } catch (error) {
        setLoad(false)
        console.log("modal detail discount", error)
      }
    }
    setLoad(false)
  }

  const fetchData = async () => {
    const id = window.location.pathname.split("/")[3] || -1
    try {
      let res = await axios({
        method: "get",
        url: `https://tlcngroup2be.herokuapp.com/seller/coupon/productid/${id}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 200) {
        setDiscountList(res.data)
        setIsCheck(
          res.data.filter((item) => item.isActive).map((item) => item.couponId)
        )
        setIsFetch(true)
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
                  fontWeight: "600",
                  height: "40px",
                }}
              >
                <div className='store-item w5'>STT</div>
                <div className='store-item w250x'>Tên coupon</div>
                <div className='store-item w300x'>Mô tả coupon</div>
                <div className='store-item w6'>%</div>
                <div className='store-item  w20'>Bắt đầu</div>
                <div className='store-item  w20'>Kết thúc</div>
                <div className='store-item w8'>Điều khiển</div>
              </div>
            </div>
            <div className='store__contain-item'>
              <div
                className='store-product__body-item '
                style={{
                  fontWeight: "600",
                  height: "40px",
                }}
              >
                <div className='store-item w5'></div>
                <input
                  type='text'
                  className='store-item--border w250x'
                  placeholder='tên coupon'
                  onChange={(e) => setDc({ ...dc, couponName: e.target.value })}
                />
                <input
                  type='text'
                  className='store-item--border w300x'
                  placeholder='mô tả'
                  onChange={(e) => setDc({ ...dc, couponDesc: e.target.value })}
                />
                <input
                  type='number'
                  className='store-item--border w6'
                  placeholder='%'
                  onChange={(e) => setDc({ ...dc, discount: e.target.value })}
                />
                <input
                  type='datetime-local'
                  className='store-item--border w20'
                  onChange={(e) =>
                    setDc({
                      ...dc,
                      startDate: new Date(e.target.value).getTime(),
                    })
                  }
                />
                <input
                  type='datetime-local'
                  className='store-item--border w20'
                  onChange={(e) =>
                    setDc({
                      ...dc,
                      expireDate: new Date(e.target.value).getTime(),
                    })
                  }
                />
                <div className='store-item--border w8'>
                  <AiOutlineSave
                    className='store-item__info--btn'
                    onClick={handleAdd}
                  />
                </div>
              </div>
            </div>
            {isFetch ? (
              discountList.length ? (
                discountList.map((item, index) => {
                  const {
                    couponId,
                    couponName,
                    couponDesc,
                    discount,
                    startDate,
                    expireDate,
                  } = item
                  return (
                    <div className='store__contain-item' key={couponId}>
                      <div
                        className='store-product__body-item '
                        style={{
                          fontWeight: "600",
                          height: "40px",
                        }}
                      >
                        <div className='store-item w5'>
                          {/* <div
                            className={`store-item__state ${
                              item.isActive
                                ? "store-item__state--active"
                                : "store-item__state--disable"
                            }`}
                            // onClick={() =>
                            //   item.isActive
                            //     ? handleActive(item.couponId)
                            //     : handleEdit(item)
                            // }
                          > */}
                          <Switch
                            checked={isCheck.includes(couponId)}
                            onChange={(e) => handleChange(item, e)}
                            onColor='#88df75'
                            onHandleColor='#4bb534'
                            handleDiameter={24}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
                            activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
                            height={24}
                            width={42}
                            className='react-switch'
                            id='material-switch'
                          />
                          {/* </div> */}
                        </div>
                        <input
                          type='text'
                          className='store-item--border w250x'
                          placeholder='tên coupon'
                          value={edit === couponId ? dc.couponName : couponName}
                          onChange={(e) =>
                            setDc({ ...dc, couponName: e.target.value })
                          }
                          disabled={edit === couponId ? "" : "disabled"}
                        />
                        <input
                          type='text'
                          className='store-item--border w300x'
                          placeholder='mô tả'
                          value={edit === couponId ? dc.couponDesc : couponDesc}
                          onChange={(e) =>
                            setDc({ ...dc, couponDesc: e.target.value })
                          }
                          disabled={edit === couponId ? "" : "disabled"}
                        />
                        <input
                          type='text'
                          className='store-item--border w6'
                          placeholder='tỉ lệ giảm'
                          value={edit === couponId ? dc.discount : discount}
                          onChange={(e) =>
                            setDc({ ...dc, discount: e.target.value })
                          }
                          disabled={edit === couponId ? "" : "disabled"}
                        />
                        <input
                          type='datetime-local'
                          className='store-item--border w20'
                          value={
                            edit === couponId
                              ? dateTrans(dc.startDate)
                              : dateTrans(startDate)
                          }
                          onChange={(e) =>
                            setDc({
                              ...dc,
                              startDate: new Date(e.target.value).getTime(),
                            })
                          }
                          disabled={edit === couponId ? "" : "disabled"}
                        />
                        <input
                          type='datetime-local'
                          className='store-item--border w20'
                          value={
                            edit === couponId
                              ? dateTrans(dc.expireDate)
                              : dateTrans(expireDate)
                          }
                          onChange={(e) =>
                            setDc({
                              ...dc,
                              expireDate: new Date(e.target.value).getTime(),
                            })
                          }
                          disabled={edit === couponId ? "" : "disabled"}
                        />
                        <div className='store-item--border w8'>
                          {edit === couponId ? (
                            <ImCancelCircle
                              className='store-item__info--btn'
                              onClick={() => setEdit("")}
                            />
                          ) : (
                            <AiOutlineDelete
                              className='store-item__info--btn'
                              onClick={() => handleDelete(couponId)}
                            />
                          )}
                          {edit === couponId ? (
                            <AiOutlineSave
                              className='store-item__info--btn'
                              onClick={() => handleUpdate(couponId)}
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
                })
              ) : (
                <div className='store__contain-item--wait'>Không có coupon</div>
              )
            ) : (
              <div className='store__contain-item--wait'>Loading</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalDetailDiscount
