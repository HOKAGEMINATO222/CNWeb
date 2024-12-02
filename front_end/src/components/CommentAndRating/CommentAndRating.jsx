import React, { useState, useEffect, useId} from 'react';
import './CommentAndRating.css';
import axios from 'axios'; 
import ReactStars from 'react-rating-stars-component';
import product_comments from '../Assets/comments.js';
import no_avt from '../Assets/no-avt.png'
import ProductRating from '../ProductRating/ProductRating.js';
import LoginPopup from '../LoginPopup/LoginPopup.js';
import AllApi from '../../api/api';

const CommentAndRating = ({ product, onOpenPopup }) => {
  const [content, setContent] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(1);
  const userId = localStorage.getItem("userID");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    console.log(newRating);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value); 
  };

  const fetchComments = async () => {
    if (product?.id) {
      try {
        const response = await AllApi.getComments(product.id);
        setComments(response.data);
        console.log(product.id);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchComments(); // Fetch comments when product ID changes
  }, [product?.id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!isLoggedIn) {
      onOpenPopup(); // Trigger the login popup
      return;
    }
  
    if (content.length < 15) {
      alert("Nội dung bình luận tối thiểu 15 ký tự.");
      return;
    }
  
    if (rating === 0) {
      alert("Vui lòng chọn đánh giá sao.");
      return;
    }

    console.log(userId);
    console.log(isLoggedIn);
  
    try {
      // Submit comment
      await AllApi.addReview(
        product._id,
        userId,
        rating,
        content
      );

      await AllApi.addComment(
        product._id,
        userId,
        content
      );
  
      alert("Bình luận và đánh giá đã được thêm.");
      setContent('');
      setRating(0);
      fetchComments(); // Refresh comments after submission
    } catch (error) {
      console.error("Error submitting comment or rating:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };
  

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const handlePageChange = (pageNumber) => {
  };

  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div id="reviews-section">
      <div className="rating-form">
        <div className="name-product">
          <h3>Đánh giá và nhận xét về sản phẩm {product.name}</h3>
          <div className="rating-average">
            <p>Stars: {product.rating}</p>
            <ProductRating rating={product.rating} />
            <p> / {product.rating} đánh giá </p>
          </div>
          <p>(Vui lòng đăng nhập vào tài khoản đã mua hàng để đánh giá sản phẩm)</p>
        </div>
        <form className="product-rating-box" onSubmit={handleSubmit}>
            <div className="comment-part">
              <textarea
                title="Nội dung"
                placeholder="Nội dung. Tối thiểu 15 ký tự *"
                name="Content"
                value={content}
                onChange={handleContentChange}
              ></textarea>
            </div>
            <div className="rating-part">
              <label>
                Rating:
                <ReactStars
                count={5}
                onChange={handleRatingChange}
                size={24}
                activeColor="gold"
                value={rating}
              />
              </label>
            </div>
            {isLoggedIn ? (
              <button className="button-yin" type="submit">
                GỬI ĐÁNH GIÁ
              </button>
            ) : (
              <button
                className="button-yin"
                type="button"
                onClick={onOpenPopup} // Trigger login popup
              >
                ĐĂNG NHẬP ĐỂ GỬI ĐÁNH GIÁ
              </button>
            )}
          </form>
        <div className="rating-content">
          <div>
            {currentComments.map(comment => (
              <div key={comment.id} className="item-comment">
                <div className="avt">
                  <img className="avt-yin" src={no_avt} alt="Avatar" />
                </div>
                <div className="info-comment">
                  <strong className="user-name">{comment.user.userName}</strong>
                  <span> ( {new Date(comment.created).toLocaleDateString()} )</span>
                  <ProductRating rating={comment.rating} />
                  <div className="review-item">{comment.comment}</div>
                </div>
              </div>
            ))}
          </div>
          <p className = "p-comment"> Xem bình luận trang số </p>
          <div className="pagination">
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={currentPage === number ? 'active' : ''}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentAndRating;