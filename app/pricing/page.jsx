'use client'; 
import PricingMode from '@/components/workspace/PricingMode';
import { useUserDetail } from '../context/UserDetailContext'; // ✅ Import đúng
import LOOKUP_DATA from '@/data/Lookup';

function Pricing() {
    const { userDetail, setUserDetail } = useUserDetail(); // ✅ Sử dụng custom hook

    return (
        <div className='mt-10 flex flex-col items-center w-full p-10 md:px-32 lg:px-48'>
            <h2 className='font-bold text-3xl'>Pricing</h2>
            <p className='text-gray-400 max-w-xl text-center mt-4'>{LOOKUP_DATA.PRICING_DESC}</p>

            <div className='p-5 border rounded-xl w-full flex justify-between mt-7 items-center' style={{backgroundColor:"#222222"}}>
                <h2 className='text-lg'><span className='font-blod'>{userDetail?.token ?? 0}</span> Token còn lại</h2> 
                {/* Khi load lại trang này, thông tin token lấy từ convex bị delay 1s , nên lúc chưa lấy dc thông tin thì sẽ là 0 token */}
                <div className=''>
                    <h2 className='font-medium'>Cần thêm token?</h2>
                    <p>Nâng cấp các gói bên dưới</p>
                </div>
            </div>
            <PricingMode/>
        </div>
    );
}

export default Pricing;
