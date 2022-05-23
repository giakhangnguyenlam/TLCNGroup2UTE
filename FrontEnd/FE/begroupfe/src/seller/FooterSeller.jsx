import React from "react"
function FooterSeller() {
  return (
    <footer className='footer'>
      <div className='grid'>
        <div className='grid__row'>
          <div className='grid__colum-2-4'>
            <h3 className='footer__heading'>Giới thiệu</h3>
            <ul className='footer-list'>
              <li className='footer-item'>
                <a href='/' className='footer-item__link'>
                  Thông tin
                </a>
              </li>
              <li className='footer-item'>
                <a href='/' className='footer-item__link'>
                  Tuyển dụng
                </a>
              </li>
              <li className='footer-item'>
                <a href='/' className='footer-item__link'>
                  Điều khoản
                </a>
              </li>
            </ul>
          </div>
          <div className='grid__colum-2-4' style={{ width: "60%" }}>
            <h3 className='footer__heading'>Danh mục</h3>
          </div>
          <div className='grid__colum-2-4'>
            <h3 className='footer__heading' style={{ textAlign: "right" }}>
              Chăm sóc khách hàng
            </h3>
            <ul className='footer-list'>
              <li className='footer-item footer-item__link--revert'>
                <a href='/' className='footer-item__link'>
                  Trung tâm trợ giúp
                </a>
              </li>
              <li className='footer-item footer-item__link--revert'>
                <a href='/' className='footer-item__link'>
                  Shopping & Technology
                </a>
              </li>
              <li className='footer-item footer-item__link--revert'>
                <a href='/' className='footer-item__link'>
                  Hướng dẫn mua hàng
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSeller
