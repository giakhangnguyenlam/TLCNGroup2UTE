import React from "react"
import { useGlobalContext } from "../context"
import { cateShoList, cateCloList, cateAccList } from "../data"
function Footer() {
  const { setCate, setCateType, setCateName } = useGlobalContext()
  const clicked = (cate, type, name) => {
    setCate(cate)
    setCateType(type)
    setCateName(name)
  }
  return (
    <footer className='footer'>
      <div className='grid'>
        <div className='grid__row'>
          <div className='grid__colum-2-4'>
            <h3 className='footer__heading'>Giới thiệu</h3>
            <ul className='footer-list'>
              <li className='footer-item'>
                <a href='' className='footer-item__link'>
                  Thông tin
                </a>
              </li>
              <li className='footer-item'>
                <a href='' className='footer-item__link'>
                  Tuyển dụng
                </a>
              </li>
              <li className='footer-item'>
                <a href='' className='footer-item__link'>
                  Điều khoản
                </a>
              </li>
            </ul>
          </div>
          <div className='grid__colum-2-4' style={{ width: "60%" }}>
            <h3 className='footer__heading'>Danh mục</h3>
            <ul className='footer-list'>
              <li className='footer-item'>
                <div
                  className='footer-item__link'
                  onClick={() => clicked("1", "", "")}
                >
                  Quần áo:
                </div>
                {cateCloList.map((item, index) => {
                  return (
                    <div
                      className='footer-item__link footer-item__link--enhance'
                      key={index}
                      onClick={() => clicked("1", item.value, item.name)}
                    >
                      {item.name}
                    </div>
                  )
                })}
              </li>
              <li className='footer-item'>
                <div
                  className='footer-item__link'
                  onClick={() => clicked("2", "", "")}
                >
                  Giày dép:
                </div>
                {cateShoList.map((item, index) => {
                  return (
                    <div
                      className='footer-item__link footer-item__link--enhance'
                      key={index}
                      onClick={() => clicked("2", item.value, item.name)}
                    >
                      {item.name}
                    </div>
                  )
                })}
              </li>
              <li className='footer-item'>
                <div
                  className='footer-item__link'
                  onClick={() => clicked("3", "", "")}
                >
                  Phụ kiện:
                </div>
                {cateAccList.map((item, index) => {
                  return (
                    <div
                      className='footer-item__link footer-item__link--enhance'
                      key={index}
                      onClick={() => clicked("3", item.value, item.name)}
                    >
                      {item.name}
                    </div>
                  )
                })}
              </li>
            </ul>
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

export default Footer
