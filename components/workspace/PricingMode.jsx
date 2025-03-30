
import React, { useState } from 'react';
import { Button } from '../ui/button';
import axios from 'axios';
import { useMutation } from 'convex/react';
import { useUserDetail } from '@/app/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import LOOKUP_DATA from '@/data/Lookup';

function PricingMode() {
  const { userDetail, setUserDetail } = useUserDetail();
  const CreateOrder = useMutation(api.orders.CreateOrder);
  const UpdateToken = useMutation(api.users.UpdateToken);
  
  const [selectedPricing, setSelectedPricing] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // ✅ Hiển thị modal chọn phương thức thanh toán
  const openPaymentModal = (pricing) => {
    if (pricing.price_f === 0) {
      alert("Gói miễn phí không cần thanh toán!");
      return;
    }
    setSelectedPricing(pricing);
    setShowPaymentModal(true);
  };

  // ✅ Gửi yêu cầu thanh toán đến API (Momo)
  const handlePayment = async () => {
    if (!selectedPricing || !userDetail) return;
    setShowPaymentModal(false);
  
    try {
      const response = await axios.post('/api/momo-payment', {
        amount: selectedPricing.price_f,
        tokens: selectedPricing.value,
        orderInfo: `Nâng cấp ${selectedPricing.name}`,
        userId: userDetail._id, // ✅ Gửi userId để Webhook nhận dạng
      });
  
      if (response.data?.payUrl) {
        window.location.href = response.data.payUrl; // ✅ Chuyển hướng đến trang thanh toán
      } else {
        console.error("Lỗi từ Momo:", response.data);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API Momo:", error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
      {LOOKUP_DATA.PRICING_OPTIONS.map((pricing, index) => (
        <div key={pricing.id || index} className='border p-7 rounded-xl flex flex-col gap-3'>
          <h2 className='font-bold text-2xl'>{pricing.name}</h2>
          <h2 className='font-medium text-lg'>{pricing.tokens} Tokens</h2>
          <p className='text-gray-400'>{pricing.desc}</p>
          <h2 className='font-bold text-2xl text-center mt-6'>{pricing.price}</h2>

          <Button onClick={() => openPaymentModal(pricing)}>Nâng cấp {pricing.name}</Button>
        </div>
      ))}

      {/* 🛒 Modal chọn phương thức thanh toán */}
      {showPaymentModal && selectedPricing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-black text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Xác nhận thanh toán</h2>
            <p className="mb-2">Bạn đang mua gói: <strong>{selectedPricing.name}</strong></p>
            <p className="mb-4">Số tiền: <strong>{selectedPricing.price} VND</strong></p>
            <div className="flex gap-4">
              <Button onClick={handlePayment} className="bg-pink-500 hover:bg-pink-600">Thanh toán qua Momo</Button>

            </div>
            <Button onClick={() => setShowPaymentModal(false)} className="mt-4 bg-gray-500 hover:bg-gray-600">Hủy</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PricingMode;
