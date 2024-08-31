import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Review.css';

const Review = ({ productId, onReviewSubmit, onCancel }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [review, setReview] = useState({
    title: '',
    description: '',
    rating: 0,
    images: [],
    videos: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview(prevReview => ({
      ...prevReview,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setReview(prevReview => ({
      ...prevReview,
      [name]: files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('productId', productId);
      formData.append('title', review.title);
      formData.append('description', review.description);
      formData.append('rating', review.rating);

      for (const file of review.images) {
        formData.append('images', file);
      }

      for (const file of review.videos) {
        formData.append('videos', file);
      }
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8001';
      const response = await fetch(`${API_BASE_URL}/api/reviews/add`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        alert('Review added successfully!');
        onReviewSubmit();
      } else {
        const data = await response.json();
        alert(data.msg || 'Failed to add review');
      }
    } catch (error) {
      console.error('Error adding review:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="review-container">
      <h2>Add a Review</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={review.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={review.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="rating">Rating (out of 5)</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={review.rating}
            onChange={handleInputChange}
            min="1"
            max="5"
            required
          />
        </div>
        <div>
          <label htmlFor="images">Upload Images</label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label htmlFor="videos">Upload Videos</label>
          <input
            type="file"
            id="videos"
            name="videos"
            accept="video/*"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="submit-btn">Submit Review</button>
        <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
      </form>
    </div>
  );
};

export default Review;
