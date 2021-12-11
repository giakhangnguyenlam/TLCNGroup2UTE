import React from "react"

function About() {
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
                <p>Đồ án môn Công nghệ phần mềm mới</p>
                <p>Frontend: Nguyễn Thành Công 18110086</p>
                <p>Backend: Nguyễn Lâm Gia Khang 18110132</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
