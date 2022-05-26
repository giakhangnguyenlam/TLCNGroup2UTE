import axios from "axios"
import React, { useEffect, useState } from "react"
import { AiOutlineSave, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import { ImCancelCircle } from "react-icons/im"
import { useGlobalContext } from "../context"
import Switch from "react-switch"

function Voucher() {
  const jwt = localStorage.getItem("jwt")
  const wFit = window.screen.availWidth * 0.8
  const hFit = window.screen.availHeight * 0.835
  const { setIsVoucher } = useGlobalContext()
  const { setRaise, idStoreUpdate, setLoading } = useGlobalContext()
  const [discountList, setDiscountList] = useState([])
  const [isCheck, setIsCheck] = useState([])
  const [isFetch, setIsFetch] = useState(false)
  const [edit, setEdit] = useState("")
  const [dc, setDc] = useState({
    voucherName: "",
    voucherDesc: "",
    discount: "",
    bearerDiscount: "",
    startDate: "",
    expireDate: "",
  })
  const resetDc = () =>
    setDc({
      voucherName: "",
      voucherDesc: "",
      discount: "",
      bearerDiscount: "",
      startDate: "",
      expireDate: "",
    })

  const [reload, setReload] = useState(false)

  const handleChange = (item, e) => {
    if (e) {
      handleEdit(item)
    } else {
      handleActive(item.voucherId)
    }
  }

  const checkData = (type) => {
   console.log(dc)
    for (let key in dc) {
      if (dc[key] === null || dc[key] === "") {
        setRaise({
          header: "Lỗi thông tin",
          content: "Bạn cần điền đủ thông tin",
          color: "#f0541e",
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
          color: "#f0541e",
        })
        return false
      }
    }
    if (type === "update") {
      if (dc.expireDate < current) {
        setRaise({
          header: "Lỗi thông tin",
          content: "Thời gian không hợp lệ",
          color: "#f0541e",
        })
        return false
      }
    }
    if (dc.startDate >= dc.expireDate) {
      setRaise({
        header: "Lỗi thông tin",
        content: "Thời gian không hợp lệ",
        color: "#f0541e",
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
    let del = window.confirm("Bạn muốn tắt voucher?")
    if (del) {
      setLoading(true)
      try {
        let res = await axios({
          method: "put",
          url: `https://tlcngroup2be.herokuapp.com/seller/voucher/active/${id}`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (res.status === 200) {
          setLoading(false)
          setReload(!reload)
          setRaise({
            header: "Mã giảm giá",
            content: "Đổi trạng thái thành công",
            color: "#4bb534",
          })
        }
      } catch (error) {
        setLoading(false)
      }
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    let del = window.confirm("Bạn muốn xóa voucher chứ?")
    if (del) {
      setLoading(true)
      try {
        let res = await axios({
          method: "delete",
          url: `https://tlcngroup2be.herokuapp.com/seller/voucher/${id}`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (res.status === 200) {
          setLoading(false)
          setReload(!reload)
          setRaise({
            header: "Mã giảm giá",
            content: "Xóa thành công",
            color: "#4bb534",
          })
        }
      } catch (error) {
        setLoading(false)
      }
    }
    setLoading(false)
  }

  const handleUpdate = async (id) => {
    setLoading(true)
    if (checkData("update")) {
      try {
        let res = await axios({
          method: "put",
          data: dc,
          url: `https://tlcngroup2be.herokuapp.com/seller/voucher/${id}`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (res.status === 200) {
          setLoading(false)
          setEdit("")
          setReload(!reload)
          setRaise({
            header: "Mã giảm giá",
            content: "Thay đổi thành công",
            color: "#4bb534",
          })
        }
      } catch (error) {
        setLoading(false)
        console.log("modal detail discount", error)
      }
    }
    setLoading(false)
  }

  const handleEdit = (item) => {
    const {
      voucherId,
      voucherName,
      voucherDesc,
      discount,
      bearerDiscount,
      startDate,
      expireDate,
    } = item
    setDc({ ...dc, voucherName, voucherDesc, discount, bearerDiscount, startDate, expireDate })
    setEdit(voucherId)
  }

  const handleAdd = async () => {
    setLoading(true)
    if (checkData("create")) {
      try {
        let res = await axios({
          method: "post",
          data: { ...dc, productId: idStoreUpdate.id },
          url: `https://tlcngroup2be.herokuapp.com/seller/voucher`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (res.status === 201) {
          setLoading(false)
          resetDc()
          setReload(!reload)
          setRaise({
            header: "Mã giảm giá",
            content: "Thêm thành công",
            color: "#4bb534",
          })
        }
      } catch (error) {
        setLoading(false)
        console.log("modal detail discount", error)
      }
    }
    setLoading(false)
  }

  const fetchData = async () => {
    try {
      let res = await axios({
        method: "get",
        url: `https://tlcngroup2be.herokuapp.com/seller/voucher/storeid/${idStoreUpdate.id}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 200) {
        setDiscountList(res.data)
        setIsCheck(
          res.data.filter((item) => item.isActive).map((item) => item.voucherId)
        )
        setIsFetch(true)
      }
    } catch (error) {}
  }
  useEffect(() => {
    fetchData()
  }, [reload])

  return (
    <div className='modal'>
      <div className='modal__overlay' onClick={() => setIsVoucher(false)}></div>
      <div className='modal__body'>
        <div className='auth-form' style={{ width: wFit, height: hFit }}>
          <div className='auth-form__container'>
          <div className="store-wrap">
           <div className='store__contain'>
           <div className='store__contain-wrap--enhance' style={{width:"unset"}}>
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
                 <div className='store-item w300x' style={{flexGrow:1}}>Mô tả coupon</div>
                 <div className='store-item w10'>Số tiền giảm</div>
                 <div className='store-item w10'>Mức giảm</div>
                 <div className='store-item  w12'>Bắt đầu</div>
                 <div className='store-item  w12'>Kết thúc</div>
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
                   onChange={(e) => setDc({ ...dc, voucherName: e.target.value })}
                 />
                 <input
                   type='text'
                   className='store-item--border w300x'
                   style={{flexGrow:1}}
                   placeholder='mô tả'
                   onChange={(e) => setDc({ ...dc, voucherDesc: e.target.value })}
                 />
                 <input
                   type='number'
                   className='store-item--border w10'
                   placeholder='Tiền giảm'
                   onChange={(e) => setDc({ ...dc, discount: e.target.value })}
                 />
                 <input
                   type='number'
                   className='store-item--border w10'
                   placeholder='Mức giảm'
                   onChange={(e) => setDc({ ...dc, bearerDiscount: e.target.value })}
                 />
                 <input
                   type='datetime-local'
                   className='store-item--border w12'
                   onChange={(e) =>
                     setDc({
                       ...dc,
                       startDate: new Date(e.target.value).getTime(),
                     })
                   }
                 />
                 <input
                   type='datetime-local'
                   className='store-item--border w12'
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
                     voucherId,
                     voucherName,
                     voucherDesc,
                     discount,
                     bearerDiscount,
                     startDate,
                     expireDate,
                   } = item
                   return (
                     <div className='store__contain-item' key={voucherId}>
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
                             checked={isCheck.includes(voucherId)}
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
                           value={edit === voucherId ? dc.voucherName : voucherName}
                           onChange={(e) =>
                             setDc({ ...dc, voucherName: e.target.value })
                           }
                           disabled={edit === voucherId ? "" : "disabled"}
                         />
                         <input
                           type='text'
                           className='store-item--border w300x'
                           placeholder='mô tả'
                           value={edit === voucherId ? dc.voucherDesc : voucherDesc}
                           onChange={(e) =>
                             setDc({ ...dc, voucherDesc: e.target.value })
                           }
                           style={{flexGrow:1}}
                           disabled={edit === voucherId ? "" : "disabled"}
                         />
                         <input
                           type='text'
                           className='store-item--border w10'
                           placeholder='tiền giảm'
                           value={edit === voucherId ? dc.discount : discount}
                           onChange={(e) =>
                             setDc({ ...dc, discount: e.target.value })
                           }
                           disabled={edit === voucherId ? "" : "disabled"}
                         />
                         <input
                           type='text'
                           className='store-item--border w10'
                           placeholder='mức giảm'
                           value={edit === voucherId ? dc.bearerDiscount : bearerDiscount}
                           onChange={(e) =>
                             setDc({ ...dc, bearerDiscount: e.target.value })
                           }
                           disabled={edit === voucherId ? "" : "disabled"}
                         />
                         <input
                           type='datetime-local'
                           className='store-item--border w12'
                           value={
                             edit === voucherId
                               ? dateTrans(dc.startDate)
                               : dateTrans(startDate)
                           }
                           onChange={(e) =>
                             setDc({
                               ...dc,
                               startDate: new Date(e.target.value).getTime(),
                             })
                           }
                           disabled={edit === voucherId ? "" : "disabled"}
                         />
                         <input
                           type='datetime-local'
                           className='store-item--border w12'
                           value={
                             edit === voucherId
                               ? dateTrans(dc.expireDate)
                               : dateTrans(expireDate)
                           }
                           onChange={(e) =>
                             setDc({
                               ...dc,
                               expireDate: new Date(e.target.value).getTime(),
                             })
                           }
                           disabled={edit === voucherId ? "" : "disabled"}
                         />
                         <div className='store-item--border w8'>
                           {edit === voucherId ? (
                             <ImCancelCircle
                               className='store-item__info--btn'
                               onClick={() => setEdit("")}
                             />
                           ) : (
                             <AiOutlineDelete
                               className='store-item__info--btn'
                               onClick={() => handleDelete(voucherId)}
                             />
                           )}
                           {edit === voucherId ? (
                             <AiOutlineSave
                               className='store-item__info--btn'
                               onClick={() => handleUpdate(voucherId)}
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
        </div>
      </div>
    </div>
  )
}

export default Voucher
