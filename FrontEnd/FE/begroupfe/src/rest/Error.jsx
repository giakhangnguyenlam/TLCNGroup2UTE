import React from "react"

function Error() {
  return (
    <div className='container'>
      <div className='grid'>
        <div className='grid__row contain'>
          <div className='grid__colum-12'>
            <div
              style={{
                height: "675px",
                backgroundColor: "white",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: "4rem",
                  lineHeight: "4.4rem",
                  margin: "0",
                  textAlign: "center",
                }}
              >
                <p>Đây là trang lỗi, mời bạn trở về trang chủ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error
