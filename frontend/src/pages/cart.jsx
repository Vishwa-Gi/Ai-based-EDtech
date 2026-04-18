import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, Trash2, BookOpen, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('/api/cart/getCart', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCartItems(response.data.courses);
      console.log(response.data.courses);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (itemId) => {
    try {
      await axios.delete(`/api/cart/cart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchCartItems();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-indigo-100 p-2 rounded-xl">
          <ShoppingCart size={20} className="text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
          <p className="text-gray-500 text-sm">
            {cartItems.length} {cartItems.length === 1 ? 'course' : 'courses'}
          </p>
        </div>
      </div>

      {/* Empty State */}
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="bg-indigo-50 p-5 rounded-full">
            <ShoppingCart size={36} className="text-indigo-400" strokeWidth={1.5} />
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-1">Your cart is empty</p>
            <p className="text-gray-400 text-sm">Browse courses and add them to your cart</p>
          </div>
          <button
            onClick={() => navigate('/course')}
            className="flex items-center gap-2 mt-2 bg-indigo-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Browse Courses
            <ArrowRight size={15} />
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              <div className="w-16 h-16 rounded-xl bg-indigo-50 flex-shrink-0 overflow-hidden">
                {item.thumbnails ? (
                  <img
                    src={item.thumbnails}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen size={22} className="text-indigo-300" strokeWidth={1.5} />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3
                  className="font-semibold text-gray-900 text-sm truncate cursor-pointer hover:text-indigo-600 transition-colors"
                  onClick={() => navigate(`/course/${item._id}`)}
                >
                  {item.name}
                </h3>
                {item.courseDetails && (
                  <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{item.courseDetails}</p>
                )}
              </div>

              {/* Remove */}
              <button
                onClick={() => handleRemoveFromCart(item._id)}
                className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove from cart"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          {/* Checkout area */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 mt-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{cartItems.length} course{cartItems.length > 1 ? 's' : ''} in cart</span>
              <button className="flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-700 active:scale-95 transition-all">
                Checkout
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
