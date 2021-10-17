import React from "react"
import acer from "./assets/img/acer.png"

function Body() {
  return (
    <div className='container'>
      <div className='grid'>
        <div className='grid__row contain'>
          <div className='grid__colum-2'>
            <nav className='category'>
              <h3 className='category__heading'>
                <i className='category__heading-icon fas fa-list'></i>
                Danh mục
              </h3>
              <ul className='category-list'>
                <li className='category-item category-item--active'>
                  <a href='/' className='category-item__link'>
                    Máy tính acer
                  </a>
                </li>
                <li className='category-item'>
                  <a href='/' className='category-item__link'>
                    Máy tính asus
                  </a>
                </li>
                <li className='category-item'>
                  <a href='/' className='category-item__link'>
                    Máy tính HP
                  </a>
                </li>
                <li className='category-item'>
                  <a href='/' className='category-item__link'>
                    Máy tính Vaio
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className='grid__colum-10'>
            <div className='home-filter'>
              <span className='home-filter__label'>Sắp xếp theo</span>
              <button className='home-filter__btn btn'>Phổ biến</button>
              <button className='home-filter__btn btn btn--primary'>
                Mới nhất
              </button>
              <button className='home-filter__btn btn'>Bán chạy</button>

              <div className='select-input'>
                <span className='select-input__label'>Giá</span>
                <i className='fas fa-angle-down'></i>
                <ul className='select-input__list'>
                  <li className='select-input__item'>
                    <a href='/' className='select-input__link'>
                      Giá: Thấp đến cao
                    </a>
                  </li>
                  <li className='select-input__item'>
                    <a href='/' className='select-input__link'>
                      Giá: Cao đến thấp
                    </a>
                  </li>
                </ul>
              </div>

              <div className='home-filter__paging'>
                <span className='home-filter__paging-num'>
                  <span className='home-filter__paging-curr'>1</span>/14
                </span>

                <div className='home-filter__paging-ctrl'>
                  <a
                    href='/'
                    className='home-filter__paging-btn   home-filter__paging-btn--disable'
                  >
                    <i className='fas fa-angle-left'></i>
                  </a>
                  <a href='/' className='home-filter__paging-btn'>
                    <i className='fas fa-angle-right'></i>
                  </a>
                </div>
              </div>
            </div>

            <div className='product'>
              <div className='grid__row'>
                {/* Product item */}
                <div className='grid__colum-2-4'>
                  <a href='/' className='product-item'>
                    <div
                      className='product-item__img'
                      style={{
                        backgroundImage: `url(${acer})`,
                      }}
                    ></div>
                    <h4 className='product-item__name'>
                      Máy tính acer nitro 7 thế hệ mới 2021, với tính năng mới
                      siêu mạnh mẽ hứa hẹn sẽ là người bạn đồng hành số 1 của
                      bạn.
                    </h4>
                    <div className='product-item__price'>
                      <span className='product-item__price-old'>
                        21.050.000đ
                      </span>
                      <span className='product-item__price-cur'>
                        19.950.000đ
                      </span>
                    </div>
                    <div className='product-item__action'>
                      <span className='product-item__action-like product-item__action-like--liked'>
                        <i className='product-item__action-like-icon far fa-heart'></i>
                        <i className='product-item__action-liked-icon fas fa-heart'></i>
                      </span>
                      <div className='product-item__rating'>
                        <i className='product-item__star--gold fas fa-star'></i>
                        <i className='product-item__star--gold fas fa-star'></i>
                        <i className='product-item__star--gold fas fa-star'></i>
                        <i className='product-item__star--gold fas fa-star'></i>
                        <i className='fas fa-star'></i>
                      </div>
                      <span className='product-item__sold'>88 đã bán</span>
                    </div>
                    <div className='product-item__origin'>
                      <span className='product-item__brand'>Acer</span>
                      <span className='product-item__origin-name'>
                        Trung Quốc
                      </span>
                    </div>
                    <div className='product-item__favorite'>
                      <i className='fas fa-check'></i>
                      <span>Yêu thích</span>
                    </div>
                    <div className='product-item__sale'>
                      <span className='product-item__sale-percent'>10%</span>
                      <span className='product-item__sale-label'>GIẢM</span>
                    </div>
                  </a>
                </div>
                <div className='grid__colum-2-4'>
                  <a href='/' className='product-item'>
                    <div
                      className='product-item__img'
                      style={{
                        backgroundImage: `url(${acer})`,
                      }}
                    ></div>
                    <h4 className='product-item__name'>
                      Máy tính acer nitro 7 thế hệ mới 2021, với tính năng mới
                      siêu mạnh mẽ hứa hẹn sẽ là người bạn đồng hành số 1 của
                      bạn. {acer}
                    </h4>
                    <div className='product-item__price'>
                      <span className='product-item__price-old'>
                        21.050.000đ
                      </span>
                      <span className='product-item__price-cur'>
                        19.950.000đ
                      </span>
                    </div>
                    <div className='product-item__action'>
                      <span className='product-item__action-like product-item__action-like--liked'>
                        <i className='product-item__action-like-icon far fa-heart'></i>
                        <i className='product-item__action-liked-icon fas fa-heart'></i>
                      </span>
                      <div className='product-item__rating'>
                        <i className='product-item__star--gold fas fa-star'></i>
                        <i className='product-item__star--gold fas fa-star'></i>
                        <i className='product-item__star--gold fas fa-star'></i>
                        <i className='product-item__star--gold fas fa-star'></i>
                        <i className='fas fa-star'></i>
                      </div>
                      <span className='product-item__sold'>88 đã bán</span>
                    </div>
                    <div className='product-item__origin'>
                      <span className='product-item__brand'>Acer</span>
                      <span className='product-item__origin-name'>
                        Trung Quốc
                      </span>
                    </div>
                    <div className='product-item__favorite'>
                      <i className='fas fa-check'></i>
                      <span>Yêu thích</span>
                    </div>
                    <div className='product-item__sale'>
                      <span className='product-item__sale-percent'>10%</span>
                      <span className='product-item__sale-label'>GIẢM</span>
                    </div>
                  </a>
                </div>
                <div className='grid__colum-2-4'>
                  <a href='/' className='product-item'>
                    <div
                      className='product-item__img'
                      style={{
                        backgroundImage: `url(${acer})`,
                      }}
                    ></div>
                    <h4 className='product-item__name'>
                      Máy tính acer nitro 7 thế hệ mới 2021, với tính năng mới
                      siêu mạnh mẽ hứa hẹn sẽ là người bạn đồng hành số 1 của
                      bạn.
                    </h4>
                    <div className='product-item__price'>
                      <span className='product-item__price-old'>
                        21.050.000đ
                      </span>
                      <span className='product-item__price-cur'>
                        19.950.000đ
                      </span>
                    </div>
                    <div className='product-item__action'>
                      <span className='product-item__action-like product-item__action-like--liked'>
                        <i className='product-item__action-like-icon far fa-heart'></i>
                        <i className='product-item__action-liked-icon fas fa-heart'></i>
                      </span>
                      <div className='product-item__rating'>
                        <i className='product-item__star--gold fas fa-star'></i>
                        <i className='product-item__star--gold fas fa-star'></i>
                        <i className='product-item__star--gold fas fa-star'></i>
                        <i className='product-item__star--gold fas fa-star'></i>
                        <i className='fas fa-star'></i>
                      </div>
                      <span className='product-item__sold'>88 đã bán</span>
                    </div>
                    <div className='product-item__origin'>
                      <span className='product-item__brand'>Acer</span>
                      <span className='product-item__origin-name'>
                        Trung Quốc
                      </span>
                    </div>
                    <div className='product-item__favorite'>
                      <i className='fas fa-check'></i>
                      <span>Yêu thích</span>
                    </div>
                    <div className='product-item__sale'>
                      <span className='product-item__sale-percent'>10%</span>
                      <span className='product-item__sale-label'>GIẢM</span>
                    </div>
                  </a>
                </div>
                <div className='grid__colum-2-4'>
                  <a href='/' className='product-item'>
                    <div
                      className='product-item__img'
                      style={{
                        backgroundImage: `url(${acer})`,
                      }}
                    ></div>
                    <h4 className='product-item__name'>
                      Máy tính acer nitro 7 thế hệ mới 2021, với tính năng mới
                      siêu mạnh mẽ hứa hẹn sẽ là người bạn đồng hành số 1 của
                      bạn.
                    </h4>
                    <div className='product-item__price'>
                      <span className='product-item__price-old'>
                        21.050.000đ
                      </span>
                      <span className='product-item__price-cur'>
                        19.950.000đ
                      </span>
                    </div>
                    <div className='product-item__action'>
                      <span className='product-item__action-like product-item__action-like--liked'>
                        <i className='product-item__action-like-icon far fa-heart'></i>
                        <i className='product-item__action-liked-icon fas fa-heart'></i>
                      </span>
                      <div className='product-item__rating'>
                        <i className='product-item__star--gold fas fa-star'></i>
                        <i className='product-item__star--gold fas fa-star'></i>
                        <i className='product-item__star--gold fas fa-star'></i>
                        <i className='product-item__star--gold fas fa-star'></i>
                        <i className='fas fa-star'></i>
                      </div>
                      <span className='product-item__sold'>88 đã bán</span>
                    </div>
                    <div className='product-item__origin'>
                      <span className='product-item__brand'>Acer</span>
                      <span className='product-item__origin-name'>
                        Trung Quốc
                      </span>
                    </div>
                    <div className='product-item__favorite'>
                      <i className='fas fa-check'></i>
                      <span>Yêu thích</span>
                    </div>
                    <div className='product-item__sale'>
                      <span className='product-item__sale-percent'>10%</span>
                      <span className='product-item__sale-label'>GIẢM</span>
                    </div>
                  </a>
                </div>
                <div className='grid__colum-2-4'>
                  <a href='/' className='product-item'>
                    <div
                      className='product-item__img'
                      style={{
                        backgroundImage: `url(${acer})`,
                      }}
                    ></div>
                    <h4 className='product-item__name'>
                      Máy tính acer nitro 7 thế hệ mới 2021, với tính năng mới
                      siêu mạnh mẽ hứa hẹn sẽ là người bạn đồng hành số 1 của
                      bạn.
                    </h4>
                    <div className='product-item__price'>
                      <span className='product-item__price-old'>
                        21.050.000đ
                      </span>
                      <span className='product-item__price-cur'>
                        19.950.000đ
                      </span>
                    </div>
                    <div className='product-item__action'>
                      <span className='product-item__action-like product-item__action-like--liked'>
                        <i className='product-item__action-like-icon far fa-heart'></i>
                        <i className='product-item__action-liked-icon fas fa-heart'></i>
                      </span>
                      <div className='product-item__rating'>
                        <i className='product-item__star--gold fas fa-star'></i>
                        <i className='product-item__star--gold fas fa-star'></i>
                        <i className='product-item__star--gold fas fa-star'></i>
                        <i className='product-item__star--gold fas fa-star'></i>
                        <i className='fas fa-star'></i>
                      </div>
                      <span className='product-item__sold'>88 đã bán</span>
                    </div>
                    <div className='product-item__origin'>
                      <span className='product-item__brand'>Acer</span>
                      <span className='product-item__origin-name'>
                        Trung Quốc
                      </span>
                    </div>
                    <div className='product-item__favorite'>
                      <i className='fas fa-check'></i>
                      <span>Yêu thích</span>
                    </div>
                    <div className='product-item__sale'>
                      <span className='product-item__sale-percent'>10%</span>
                      <span className='product-item__sale-label'>GIẢM</span>
                    </div>
                  </a>
                </div>
                <div className='grid__colum-2-4'>
                  <a href='/' className='product-item'>
                    <div
                      className='product-item__img'
                      style={{
                        backgroundImage: `url(${acer})`,
                      }}
                    ></div>
                    <h4 className='product-item__name'>
                      Máy tính acer nitro 7 thế hệ mới 2021, với tính năng mới
                      siêu mạnh mẽ hứa hẹn sẽ là người bạn đồng hành số 1 của
                      bạn.
                    </h4>
                    <div className='product-item__price'>
                      <span className='product-item__price-old'>
                        21.050.000đ
                      </span>
                      <span className='product-item__price-cur'>
                        19.950.000đ
                      </span>
                    </div>
                    <div className='product-item__action'>
                      <span className='product-item__action-like product-item__action-like--liked'>
                        <i className='product-item__action-like-icon far fa-heart'></i>
                        <i className='product-item__action-liked-icon fas fa-heart'></i>
                      </span>
                      <div className='product-item__rating'>
                        <i className='product-item__star--gold fas fa-star'></i>
                        <i className='product-item__star--gold fas fa-star'></i>
                        <i className='product-item__star--gold fas fa-star'></i>
                        <i className='product-item__star--gold fas fa-star'></i>
                        <i className='fas fa-star'></i>
                      </div>
                      <span className='product-item__sold'>88 đã bán</span>
                    </div>
                    <div className='product-item__origin'>
                      <span className='product-item__brand'>Acer</span>
                      <span className='product-item__origin-name'>
                        Trung Quốc
                      </span>
                    </div>
                    <div className='product-item__favorite'>
                      <i className='fas fa-check'></i>
                      <span>Yêu thích</span>
                    </div>
                    <div className='product-item__sale'>
                      <span className='product-item__sale-percent'>10%</span>
                      <span className='product-item__sale-label'>GIẢM</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <ul className='pagination product__pagination'>
              <li className='pagination-item'>
                <a href='/' className='pagination-item__link'>
                  <i className='pagination-item__icon fas fa-angle-left'></i>
                </a>
              </li>
              <li className='pagination-item pagination-item--active'>
                <a href='/' className='pagination-item__link'>
                  1
                </a>
              </li>
              <li className='pagination-item'>
                <a href='/' className='pagination-item__link'>
                  2
                </a>
              </li>
              <li className='pagination-item'>
                <a href='/' className='pagination-item__link'>
                  3
                </a>
              </li>
              <li className='pagination-item'>
                <a href='/' className='pagination-item__link'>
                  4
                </a>
              </li>
              <li className='pagination-item'>
                <a href='/' className='pagination-item__link'>
                  5
                </a>
              </li>
              <li className='pagination-item'>
                <a href='/' className='pagination-item__link'>
                  ...
                </a>
              </li>
              <li className='pagination-item'>
                <a href='/' className='pagination-item__link'>
                  14
                </a>
              </li>
              <li className='pagination-item'>
                <a href='/' className='pagination-item__link'>
                  <i className='pagination-item__icon fas fa-angle-right'></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Body
