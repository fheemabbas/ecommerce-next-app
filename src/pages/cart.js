  import React, { useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '@/redux/cartSlice';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DiscountIcon from '@mui/icons-material/Discount';
import Link from 'next/link';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [menualCoupon, setMenualCoupon] = useState('');

  const coupons = [
    { code: 'WELCOMEBACK100', description: 'Flat Rs.100 off', discount: 100, minAmount: 199, isDisabled: (amount) => amount >= this.minAmount },
    { code: 'TRYNEW', description: 'Get 60% off', discount: (amount) => Math.min(amount * 0.6, 110), minAmount: 149, isDisabled: (amount) => amount >= this.minAmount },
  ];

  const applyCoupon = (coupon) => {
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    if (totalAmount >= coupon.minAmount) {
      const discount = typeof coupon.discount === 'function' ? coupon.discount(totalAmount) : coupon.discount;
      setDiscountAmount(discount);
      setAppliedCoupon(coupon.code);
    } else {
      alert(`Minimum cart value for this coupon is ₹${coupon.minAmount}`);
    }
    setIsPopupOpen(false);
  };

  const removeCoupon = () => {
    setAppliedCoupon('');
    setDiscountAmount(0);
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountedTotal = totalAmount - discountAmount;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cartItems.length === 0 ? (
          <h2>Your cart is empty. <Link href="/">Go shopping!</Link></h2>
        ) : (
          <div className="cart-items">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="product-card border p-4 mb-4">
                <div className="flex gap-4">
                  <img src={item.image} alt={item.title} width={100} height={100} objectFit="contain" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-500">Size: {item.size}</p>
                    <p className="text-gray-500">Seller: {item.seller}</p>
                    <p className="text-green-500 font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                    <div className="flex gap-2">
                      {item.quantity === 1 ? (
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded-full border-solid border-black text-16 bg-white text-black"
                          onClick={() => {
                            dispatch(removeFromCart({ id: item.id }));
                          }}
                        >
                          <DeleteOutlineIcon size="small" color="secondary" />
                        </button>
                      ) : (
                        <button
                          className="bg-gray-200 text-gray-700 px-2 rounded-full border-solid border-black text-16 bg-white text-black"
                          onClick={() => {
                            dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
                          }}
                        >
                          <RemoveIcon size="small" />
                        </button>
                      )}
                      <span className="text-gray-700">{item.quantity}</span>
                      <button
                        className="bg-gray-200 text-gray-700 px-2 rounded-full border-solid border-black text-16 bg-white text-black"
                        onClick={() => {
                          dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
                        }}
                      >
                        <AddIcon size="small" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="price-details">
            <h2 className="text-lg font-semibold">Price Details</h2>
            <div className="flex justify-between mt-4">
              <span>Price ({cartItems.length} items)</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between mt-4 text-green-500">
                <span>Discount ({appliedCoupon})</span>
                <span>-₹{discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between mt-4">
              <span>Delivery Charges</span>
              <span>
                {discountedTotal > 100 ? (
                  <>
                    <span className="text-gray-500 line-through">₹120</span>
                    <span className="text-green-500 ml-2">Free</span>
                  </>
                ) : (
                  <span className="text-gray-500">₹120</span>
                )}
              </span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold">
              <span>Total Amount</span>
              <span>₹{(discountedTotal + (discountedTotal > 100 ? 0 : 120)).toFixed(2)}</span>
            </div>
            {!appliedCoupon ? (
              <div
                className="border-dashed border-2 border-gray-300 p-3 mt-4 flex items-center cursor-pointer"
                onClick={() => setIsPopupOpen(true)}
              >
                <DiscountIcon className="text-gray-500 mr-2" />
                <span>Apply Coupon</span>
              </div>
            ) : (
              <div className="border-dashed border-2 border-gray-300 p-3 mt-4 flex justify-between items-center">
                <span>{appliedCoupon}</span>
                <button onClick={removeCoupon} className="text-red-500">REMOVE</button>
              </div>
            )}
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Place Order</button>
          </div>
        )}
      </div>

      {isPopupOpen && (
        <div  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-bold">Available Coupons</h2>
              <button onClick={() => setIsPopupOpen(false)} className="text-gray-500">X</button>
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter coupon code"
                onChange={(e)=> {
                  setMenualCoupon(e.target.value)
                }}
                className="border border-gray-300 p-2 rounded w-full mb-4"
              />
              {menualCoupon !== '' && coupons.findIndex(i=> i.code.toLowerCase() === menualCoupon.toLowerCase()) === -1 &&
              <span className='text-red text-16'>Invalid Coupon Code</span>}
              <button
              disabled={menualCoupon === '' && coupons.findIndex(i=> i.code.toLowerCase() === menualCoupon.toLowerCase()) === -1}
            onClick={() => {
            const CouponIndex = coupons.findIndex(i=> i.code.toLowerCase() === menualCoupon.toLowerCase())
            // console.log("coupons[CouponIndex] out",coupons[CouponIndex])
            console.log("coupons[CouponIndex] out",CouponIndex)
            console.log("coupons[CouponIndex] out menualCoupon",menualCoupon)
            if(menualCoupon !== '' && CouponIndex != -1) {
            console.log("coupons[CouponIndex] ",coupons[CouponIndex])
            applyCoupon(coupons[CouponIndex])
            }
            }}
              className="bg-orange-500 text-white px-4 py-2 rounded w-full mb-4">APPLY</button>
            </div>
            <div className="space-y-4">
              {coupons.map((coupon) => (
                <div key={coupon.code} className="border-t border-b py-2">
                  <h1 className='text-bold text-green'>{coupon.code}</h1>
                  <div className="flex justify-between">
                    <span>{coupon.description}</span>
                    <button
                      onClick={() => applyCoupon(coupon)}
                      className="text-orange-500"
                    >
                      APPLY COUPON
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
