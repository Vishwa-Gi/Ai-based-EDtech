import express from 'express';
import { addToCart, getCartItems, removeFromCart, clearCart } from '../Logics/cartController.js';
import protectedRoutes from '../middleware/protectedRoutes.js';

const router = express.Router();

router.post('/add', protectedRoutes, addToCart);
router.get('/getCart', protectedRoutes, getCartItems);
router.delete('/cart/:itemId', protectedRoutes, removeFromCart);
router.delete('/deleteCart', protectedRoutes, clearCart);

export default router;