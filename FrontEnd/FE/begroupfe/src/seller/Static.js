import axios from "axios"
import React, { useEffect, useState } from "react"
import { useGlobalContext } from "../context"
import exportFromJSON from "export-from-json"
import { Chart } from "react-google-charts"

function Static() {
  const jwt = localStorage.getItem("jwt")
  const wFit = window.screen.availWidth * 0.8
  const hFit = window.screen.availHeight * 0.835
  const { setIsStatic, idStoreUpdate, reloadSell } = useGlobalContext()
  const [screen, setScreen] = useState(false)
  const [orders, setOrders] = useState()
  const [chartData1, setChartdata1] = useState({
    data: [],
    threshold: 0,
  })
  const [chartData2, setChartdata2] = useState({
    data: [],
    threshold: 0,
  })
  let today = new Date()
  let dd = String(today.getDate()).padStart(2, "0")
  let mm = String(today.getMonth() + 1).padStart(2, "0")
  let yyyy = today.getFullYear()

  today = yyyy + "-" + mm + "-" + dd
  const [date, newDate] = useState({ date: today, type: "all" })
  const [temp, setTemp] = useState({ date1: "2021-01-01", date2: "2021-01-02" })

  const exportEx = () => {
    let dateUWant = new Date(`${date.date} `)
    let ndd = String(dateUWant.getDate()).padStart(2, "0")
    let nmm = String(dateUWant.getMonth() + 1).padStart(2, "0")
    let nyyyy = dateUWant.getFullYear()
    if (orders) {
      let fileName = ""
      if (date.type === "all") {
        fileName = "Thống kê tổng"
      }
      if (date.type === "day") {
        fileName = `Thống kê ngày ${ndd}-${nmm}-${nyyyy}`
      }
      if (date.type === "my") {
        fileName = `Thống kê tháng ${nmm}-${nyyyy}`
      }
      const data = orders.map((item) => {
        const { orderId, quantity, description, productName, price, date, id } =
          item
        return {
          id,
          orderId,
          date,
          productName,
          quantity,
          price,
          description,
        }
      })
      const exportType = exportFromJSON.types.csv

      exportFromJSON({ data, fileName, exportType, withBOM: true })
    }
  }

  const fetchData = async () => {
    let url = ""
    let dateUWant = new Date(date.date)
    let dateUHave = new Date(Date.now())
    if (dateUWant <= dateUHave) {
      if (date.type === "all") {
        url = `https://tlcngroup2be.herokuapp.com/seller/order/${idStoreUpdate.id}/statusfinished`
      } else if (date.type === "day") {
        let ndd = String(dateUWant.getDate()).padStart(2, "0")
        let nmm = String(dateUWant.getMonth() + 1).padStart(2, "0")
        let nyyyy = dateUWant.getFullYear()
        url = `https://tlcngroup2be.herokuapp.com/seller/order/${idStoreUpdate.id}/date/${ndd}-${nmm}-${nyyyy}`
      } else if (date.type === "month") {
        let nmm = String(dateUWant.getMonth() + 1).padStart(2, "0")
        let nyyyy = dateUWant.getFullYear()
        url = `https://tlcngroup2be.herokuapp.com/seller/order/${idStoreUpdate.id}/month/${nmm}/year/${nyyyy}`
      } else if (date.type === "year") {
        let nyyyy = dateUWant.getFullYear()
        url = `https://tlcngroup2be.herokuapp.com/seller/order/${idStoreUpdate.id}/year/${nyyyy}`
      } else if (date.type === "quarter") {
        let nq = Math.floor((dateUWant.getMonth() + 3) / 3)
        let nyyyy = dateUWant.getFullYear()
        url = `https://tlcngroup2be.herokuapp.com/seller/order/${idStoreUpdate.id}/quarter/${nq}/year/${nyyyy}`
      } else if (date.type === "range") {
        dateUWant = new Date(`${temp.date1}`)
        dateUHave = new Date(`${temp.date2}`)
        let d1 = String(dateUWant.getDate()).padStart(2, "0")
        let m1 = String(dateUWant.getMonth() + 1).padStart(2, "0")
        let y1 = dateUWant.getFullYear()
        let d2 = String(dateUHave.getDate()).padStart(2, "0")
        let m2 = String(dateUHave.getMonth() + 1).padStart(2, "0")
        let y2 = dateUHave.getFullYear()
        url = `https://tlcngroup2be.herokuapp.com/seller/order/${idStoreUpdate.id}/datestart/${d1}-${m1}-${y1}/dateend/${d2}-${m2}-${y2}`
      }
      try {
        let res = await axios({
          method: "get",
          url,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (!res.data.length) {
          setOrders(null)
          setScreen(true)
        }
        if (res.status === 200 && res.data.length) {
          setOrders(res.data)
          let temp = res.data.map((item) => item.productName)
          let label = [...new Set(temp)]
          let amount = Array([...new Set(temp)].length).fill(0)
          let total = Array([...new Set(temp)].length).fill(0)
          let data1 = [["Tên sản phẩm", "Số lượng"]]
          let data2 = [["Tên sản phẩm", "Doanh thu"]]

          for (let i = 0; i < label.length; i++) {
            let temp = res.data
              .filter((item) => item.productName === label[i])
              .reduce((prev, curr) => prev + curr.quantity, 0)
            amount[i] = temp
            data1[i + 1] = [label[i], amount[i]]
            temp = res.data
              .filter((item) => item.productName === label[i])
              .reduce((prev, curr) => prev + curr.quantity * curr.price, 0)
            total[i] = temp
            data2[i + 1] = [label[i], total[i]]
          }

          if (label.length > 4) {
            setChartdata1({
              data: data1,
              threshold: (
                (amount[3] + amount[4]) /
                amount.reduce((prev, curr) => prev + curr, 0)
              ).toFixed(2),
            })
            setChartdata2({
              data: data2,
              threshold: (
                (total[3] + total[4]) /
                total.reduce((prev, curr) => prev + curr, 0)
              ).toFixed(2),
            })
          } else {
            setChartdata1({ data: data1, threshold: 0 })
            setChartdata2({ data: data2, threshold: 0 })
          }
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      setOrders()
      setScreen(true)
    }
  }

  useEffect(() => {
    setScreen(false)
    fetchData()
  }, [date])

  return (
    <div className='modal'>
      <div className='modal__overlay' onClick={() => setIsStatic(false)}></div>
      <div className='modal__body'>
        <div className='auth-form' style={{ width: wFit, height: hFit }}>
          <div className='auth-form__container'>
            <div
              className='auth-form__header'
              style={{ flexDirection: "column" }}
            >
              <h3 className='store-product__heading'>Thống kê</h3>
              <div className='store-product__header-add'>
                <div
                  style={{
                    fontSize: "18px",
                    lineHeight: "20px",
                    marginRight: "8px",
                    border: "1px solid #fefefe",
                    display: "inline-block",
                    padding: "4px",
                    backgroundColor: "var(--primary-color)",
                    color: "var(--white-color)",
                    borderRadius: "8px",
                    cursor: "pointer",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                  }}
                  onClick={exportEx}
                >
                  Tải về
                </div>
                <label className='order__label'>Lọc theo:</label>
                <select
                  className='order__date'
                  onChange={(e) => {
                    setOrders(undefined)
                    newDate({ ...date, type: e.target.value })
                  }}
                >
                  <option value='all'>Tất cả</option>
                  <option value='day'>Ngày</option>
                  <option value='month'>Tháng</option>
                  <option value='quarter'>Quý</option>
                  <option value='year'>Năm</option>
                  <option value='range'>Khoảng tùy ý</option>
                </select>
                {date.type === "all" || date.type === "day" ? (
                  <input
                    type='date'
                    className='order__date'
                    value={date.date}
                    onChange={(e) => {
                      if (date.type === "all") {
                        setOrders(undefined)
                        newDate({ type: "day", date: e.target.value })
                      } else {
                        setOrders(undefined)
                        newDate({ ...date, date: e.target.value })
                      }
                    }}
                  />
                ) : date.type === "month" ? (
                  <input
                    type='month'
                    className='order__date'
                    value={date.date.slice(0, 7)}
                    onChange={(e) => {
                      setOrders(undefined)
                      newDate({ ...date, date: `${e.target.value}-01` })
                    }}
                  />
                ) : date.type === "year" ? (
                  <select
                    className='order__date'
                    onChange={(e) => {
                      setOrders(undefined)
                      newDate({ ...date, date: `${e.target.value}-01-01` })
                    }}
                  >
                    <option value='2021'>Năm 2021</option>
                  </select>
                ) : date.type === "quarter" ? (
                  <select
                    className='order__date'
                    value={
                      Math.floor((Number(date.date.slice(5, 7)) + 2) / 3) === 1
                        ? "2021-01"
                        : Math.floor(
                            (Number(date.date.slice(5, 7)) + 2) / 3
                          ) === 2
                        ? "2021-04"
                        : Math.floor(
                            (Number(date.date.slice(5, 7)) + 2) / 3
                          ) === 3
                        ? "2021-07"
                        : "2021-10"
                    }
                    onChange={(e) => {
                      setOrders(undefined)
                      newDate({ ...date, date: `${e.target.value}-01` })
                    }}
                  >
                    <option value='2021-01'>Quý 1 - 2021</option>
                    <option value='2021-04'>Quý 2 - 2021</option>
                    <option value='2021-07'>Quý 3 - 2021</option>
                    <option value='2021-10'>Quý 4 - 2021</option>
                  </select>
                ) : (
                  <>
                    <input
                      type='date'
                      className='order__date'
                      onChange={(e) => {
                        setTemp({ ...temp, date1: e.target.value })
                      }}
                    />
                    <input
                      type='date'
                      className='order__date'
                      onChange={(e) => {
                        setTemp({ ...temp, date2: e.target.value })
                        if (new Date(temp.date1) < new Date(e.target.value)) {
                          setTemp({ ...temp, date2: e.target.value })
                          setOrders(undefined)
                          newDate({ ...date, date: e.target.value })
                        }
                      }}
                    />
                  </>
                )}
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <div
                className='store-product__body'
                style={{
                  height: (hFit - 158) * 0.92,
                  width: wFit - 64,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {orders ? (
                  <>
                    <Chart
                      width={`${(wFit - 64) * 0.45}px`}
                      height={"400px"}
                      chartType='PieChart'
                      loader={<div>Loading Chart</div>}
                      data={chartData1.data}
                      options={{
                        title: "Sản phẩm bán chạy",
                      }}
                      rootProps={{ "data-testid": "1" }}
                    ></Chart>
                    <Chart
                      width={`${(wFit - 64) * 0.45}px`}
                      height={"400px"}
                      chartType='PieChart'
                      loader={<div>Loading Chart</div>}
                      data={chartData2.data}
                      options={{
                        title: "Doanh thu từ sản phẩm",
                      }}
                      rootProps={{ "data-testid": "2" }}
                    />
                  </>
                ) : (
                  <div className='order__wait '>
                    <div className='order__wait-content'>
                      {screen ? "Không có sản phẩm" : "Loading..."}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div
              className='auth-form__controls'
              style={{
                justifyContent: "center",
                marginTop: "0",
                height: (hFit - 158) * 0.08,
              }}
            >
              <button
                className='btn btn--normal auth-form__controls-back'
                style={{
                  width: "100%",
                  height: (hFit - 158) * 0.07,
                  marginTop:
                    (hFit - 158) * 0.01 > 10 ? "10px" : (hFit - 158) * 0.01,
                }}
                onClick={() => setIsStatic(false)}
              >
                <i className='fas fa-undo' style={{ fontSize: "1.6rem" }}></i>
                THOÁT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Static
