import axios from "axios"
import React, { useState } from "react"
import { AiFillStar } from "react-icons/ai"
import { useGlobalContext } from "../context"
import Loading from "../ultis/Loading"
import "../assets/css/CommentForm.css"

function UserComment() {
  const productId = Number(localStorage.getItem("prodId"))
  const jwt = localStorage.getItem("jwt")
  const username = localStorage.getItem("name")
  const { setIsComment, loading, setLoading, setRaise } = useGlobalContext()
  const [comment, setComment] = useState({ star: 0, comment: "" })

  const handleChange = (e) => {
    setComment({ ...comment, comment: e.target.value })
  }
  const handleSubmit = async () => {
    setLoading(true)
    try {
      let res = await axios({
        method: "post",
        url: "https://tlcngroup2be.herokuapp.com/user/comment",
        data: {
          productId,
          username,
          comment: comment.comment,
          star: comment.star,
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 201) {
        localStorage.removeItem("prodId")
        setRaise({
          header: "Nhận xét",
          content: "Nhận xét thành công! Cảm ơn bạn đã đánh giá.",
          color: "#4bb543",
        })
        setLoading(false)
        setIsComment(false)
      } else {
        setRaise({
          header: "Nhận xét",
          content: "Nhận xét thất bại. Mời bạn thử lại lần sau",
          color: "var(--primary-color)",
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='modal'>
      <div className='modal__overlay' onClick={() => setIsComment(false)}></div>
      <div className='modal__body'>
        <div className='auth-form' style={{ width: "600px" }}>
          <div className='auth-form__container'>
            <div className='auth-form__header'>
              <h3 className='auth-form__heading'>Gửi đánh giá của bạn</h3>
            </div>

            <div className='auth-form__form'>
              <div className='auth-form__group comment-form__group'>
                <label className='comment-form__label' style={{ width: "25%" }}>
                  Chấm điểm:
                </label>
                <div className='comment-form__icon'>
                  {[1, 2, 3, 4, 5].map((item) => {
                    return (
                      <AiFillStar
                        className={`comment-form__star ${
                          comment.star >= item && "comment-form__star--fill"
                        }`}
                        onClick={() => setComment({ ...comment, star: item })}
                      />
                    )
                  })}
                </div>
              </div>
              <div className='auth-form__group'>
                <label className='comment-form__label'>Bình luận:</label>
                <textarea
                  name='comment'
                  className='comment-form__input'
                  rows='4'
                  value={comment.comment}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>

            <div className='auth-form__controls'>
              <button
                className='btn btn--normal auth-form__controls-back'
                onClick={() => setIsComment(false)}
              >
                THOÁT
              </button>
              <button className='btn btn--primary' onClick={handleSubmit}>
                Gửi đánh giá
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading && <Loading />}
    </div>
  )
}

export default UserComment
