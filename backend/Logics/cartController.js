import Cart from "../Models/cart.js";
import Course from "../Models/course.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.body;
    // console.log("Adding to cart:", { userId, courseId });
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, courses: [] });
    }
    if (cart.courses.includes(courseId)) {
      return res.status(400).json({ message: 'Course already in cart' });
    }
    cart.courses.push(courseId);
    await cart.save();
    res.status(200).json({ message: 'Course added to cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCartItems = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log("Fetching cart for user:", userId);
        const cart = await Cart.findOne({ user: userId }).populate('courses', 'name courseDetails thumbnails');
        if (!cart) {
            return res.status(200).json({ courses: [] });
        }
        console.log(cart);
        res.status(200).json({ courses: cart.courses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { itemId } = req.params;
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        cart.courses = cart.courses.filter(courseId => courseId.toString() !== itemId);
        await cart.save();
        res.status(200).json({ message: 'Course removed from cart' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const clearCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        cart.courses = [];
        await cart.save();
        res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};