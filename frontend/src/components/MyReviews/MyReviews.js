import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './MyReviews.css';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:8001/api/reviews/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        } else {
          console.error('Failed to fetch reviews');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [navigate]);

  const renderRatingStars = (rating) => {
    return Array.from({ length: 5 }, (v, i) => (
      <span key={i} className={i < rating ? 'star filled' : 'star'}>&#9733;</span>
    ));
  };

  return (
    <div className="my-reviews-container">
      <h2>My Reviews</h2>
      {reviews.length ? (
        reviews.map((review) => (
          <div key={review._id} className="review-item">
            <div className="review-details">
              <h4><strong>Product Name </strong>
              <Link to={`/product/${review.product_Id}`}>{review.productId ? review.productName : 'Unknown Product'}</Link></h4>
              <p><strong>Price : </strong>Rs. {review.productPrice}</p>
              <p><strong>Purchase Date:</strong> {review.orderDate ? new Date(review.orderDate).toLocaleDateString() : "N/A"}</p>
              <p><strong>Rating:</strong> {renderRatingStars(review.rating)}</p>
              <p><strong>Review Title:</strong> {review.title}</p>
              <p><strong>Review Description:</strong> {review.description}</p>
              {review.images && review.images.length > 0 && (
                <div className="review-images">
                  {review.images.map((image, index) => (
                    <img key={index} src={`http://localhost:8001${image}`} alt={`Review Image ${index + 1}`} />
                  ))}
                </div>
              )}

              {review.videos && review.videos.length > 0 && (
                <div className="review-videos">
                  {review.videos.map((video, index) => (
                    <video key={index} controls src={`http://localhost:8001${video}`} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>You haven't submitted any reviews yet.</p>
      )}
    </div>
  );
};

export default MyReviews;
