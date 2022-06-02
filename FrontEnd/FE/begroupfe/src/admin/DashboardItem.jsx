import React from "react"
import CountUp from "react-countup"

function DashboardItem({ data, title, background }) {
  return (
    <div className='admin-dashboard__item' style={background}>
      <div className='admin-dashboard__item-title'>{title}</div>
      <div className='admin-dashboard__item-number'>
        {data ? (
          <CountUp start={0} end={data} duration={1.75} />
        ) : (
          "Đang tải..."
        )}
      </div>
    </div>
  )
}

export default DashboardItem
