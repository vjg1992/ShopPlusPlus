import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Review from '../Review/Review';
import './ProductDetail.css';

const ProductDetail = ({ updateCartCount }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [existingReview, setExistingReview] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const fetchProductAndReview = async () => {
    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8001';
      const productResponse = await fetch(`${API_BASE_URL}/api/products/${id}`);
      if (!productResponse.ok) {
        throw new Error('Failed to fetch product');
      }
      const productData = await productResponse.json();
      setProduct(productData);

      const token = localStorage.getItem('token');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

      const reviewResponse = await fetch(`${API_BASE_URL}/api/reviews/product/${productData.ProductID}`, {
        headers: headers
      });

      if (reviewResponse.ok) {
        const reviewsData = await reviewResponse.json();
        setReviews(reviewsData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchProductAndReview();
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { from: location.pathname, ...location.state } });
      return;
    }

    if (product.StockQuantity < quantity) {
      alert('Sorry, not enough stock available.');
      return;
    }

    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8001';
      const response = await fetch('${API_BASE_URL}/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product.ProductID,
          quantity: quantity,
          productModel: product.category
        })
      });

      if (response.ok) {
        const data = await response.json();
        alert('Product added to cart successfully!');
        updateCartCount(data.itemCount);
      } else {
        alert('Failed to add product to cart.');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleAddToWishlist = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8001';
      const response = await fetch('${API_BASE_URL}/api/wishlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product.ProductID,
          productModel: product.category
        })
      });

      if (response.ok) {
        alert('Product added to wishlist successfully!');
      } else {
        alert('Failed to add product to wishlist.');
      }
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleBuyNow = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    navigate('/buy-now-checkout', {
      state: {
        product: product,
        quantity: quantity,
      }
    });
  };

  const renderRatingStars = (rating) => {
    return Array.from({ length: 5 }, (v, i) => (
      <span key={i} className={i < rating ? 'star filled' : 'star'}>&#9733;</span>
    ));
  };

  if (!product) return <div>Loading...</div>;
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8001';
  return (
    <div className="product-detail-container">
      <img src={product.Images[0]} alt={product.ProductName} />
      <div className="product-detail-info">
        <h2>{product.ProductName}</h2>
        <p>{product.Description}</p>
        <p><strong>Price:</strong> Rs. {product.Price}</p>
        <p><strong>Rating:</strong> {product.Rating}</p>
        <p><strong>Stock:</strong> {product.StockQuantity > 0 ? 'In Stock' : 'Out of Stock'}</p>
        <div className="quantity-selector">
          <label>Qty: </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            min="1"
            max={product.StockQuantity}
          />
        </div>
        {product.StockQuantity > 0 ? (
          <div className='product-buttons'>
            <button onClick={handleBuyNow} className="buy-now-btn">Buy Now</button>
            <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
            <button onClick={handleAddToWishlist} className="add-to-wishlist-btn">Add to Wishlist</button>
          </div>
        ) : (
          <p className="out-of-stock">This product is currently out of stock.</p>
        )}
      </div>
      {!existingReview && !showReviewForm && (
          <button onClick={() => setShowReviewForm(true)} className="add-review-btn">Add Review</button>
        )}

        {!existingReview && showReviewForm && (
          <div className="review-form-wrapper">
            <Review
              productId={product.ProductID}
              onReviewSubmit={() => {
                setShowReviewForm(false);
                fetchProductAndReview();
              }}
              onCancel={() => setShowReviewForm(false)}
            />
          </div>
        )}
      <div className="product-reviews">
        <h3>Customer Reviews</h3>
        {reviews.length ? (
          reviews.map(review => (
            <div key={review._id} className="review-item">
              <p><strong>Customer Name:</strong> {review.userName}</p>
              <p><strong>Purchase Date:</strong> {review.orderDate ? new Date(review.orderDate).toLocaleDateString() : "N/A"}</p>
              <p><strong>Title:</strong>{review.title}</p>
              <p><strong>Description:</strong>{review.description}</p>
              <p><strong>Rating:</strong> {renderRatingStars(review.rating)}</p>
              {review.images && review.images.length > 0 && (
                <div className="review-images">
                  {review.images && review.images.length > 0 && (
                    <div className="review-images">
                      {review.images.map((image, index) => (
                        <img key={index} src={`${API_BASE_URL}${image}`} alt={`Review Image ${index + 1}`} />
                      ))}
                    </div>
                  )}

                  {review.videos && review.videos.length > 0 && (
                    <div className="review-videos">
                      {review.videos.map((video, index) => (
                        <video key={index} controls src={`${API_BASE_URL}${video}`} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
