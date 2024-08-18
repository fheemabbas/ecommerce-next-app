import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  appliedCoupon: null,
  discountAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    applyCoupon: (state, action) => {
      const { coupon, totalAmount } = action.payload;
      if (totalAmount >= coupon.minAmount) {
        const discount = typeof coupon.discount === 'function' ? coupon.discount(totalAmount) : coupon.discount;
        state.appliedCoupon = coupon.code;
        state.discountAmount = discount;
      } else {
        alert(`Minimum cart value for this coupon is ₹${coupon.minAmount}`);
      }
    },
    removeCoupon: (state) => {
      state.appliedCoupon = null;
      state.discountAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, applyCoupon,removeCoupon } = cartSlice.actions;

export default cartSlice.reducer;
