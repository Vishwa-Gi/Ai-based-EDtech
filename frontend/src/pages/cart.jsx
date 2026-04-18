import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const cart = () => {

    const [cartItems, setCartItems] = useState([]);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('/api/cart/getCart', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
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
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchCartItems();
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

  return (
    <div>
        <h1>Cart</h1>
        {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
        ) : (
            <ul>
                {cartItems.map((item) => (
                    <li key={item._id}>{item.name} <button onClick={() => handleRemoveFromCart(item._id)}>Remove</button></li>
                ))}
            </ul>
        )}
    </div>
  )
}

export default cart
