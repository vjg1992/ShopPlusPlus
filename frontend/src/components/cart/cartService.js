export const updateCartQuantity = async (productId, quantity, productModel) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8001';  
  const response = await fetch(`${API_BASE_URL}/api/cart/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ productId, quantity, productModel }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update quantity');
    }
  
    return await response.json();
  };
  
  export const removeCartItem = async (productId, productModel) => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8001';
    const response = await fetch(`${API_BASE_URL}/api/cart/remove`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ productId, productModel }),
    });
    if (!response.ok) {
      throw new Error('Failed to remove item');
  }
    return await response.json();
  };
  