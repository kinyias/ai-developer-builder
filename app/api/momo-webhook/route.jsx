import { api, internal } from '@/convex/_generated/api'; // ✅ Import từ `internal`
import { mutation } from '@/convex/_generated/server'; // ✅ Import mutation để gọi Convex
import LOOKUP_DATA from '@/data/Lookup';
import { ConvexHttpClient } from "convex/browser";
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
export async function POST(req) {
  try {
    const body = await req.json();
    console.log("🚀 Nhận request từ Momo Webhook!");
    console.log("📥 Dữ liệu webhook từ Momo:", body);

    const { orderId, requestId, amount, orderInfo, transId, resultCode, message, extraData, tokens } = body;

    // ✅ Kiểm tra nếu giao dịch thất bại
    if (resultCode !== 0) {
      console.error("❌ Giao dịch thất bại:", message);
      return new Response(JSON.stringify({ message: "Giao dịch thất bại", error: message }), { status: 400 });
    }

    // ✅ Lấy userId từ extraData (được gửi từ `momo-payment`)
    const userId = extraData;
    if (!userId) {
      console.error("❌ Không tìm thấy userId trong extraData!");
      return new Response(JSON.stringify({ message: "Không tìm thấy userId" }), { status: 400 });
    }

    console.log(`✅ Xác nhận giao dịch cho userId: ${userId}, Số tiền: ${amount}`);

    // ✅ Lưu đơn hàng vào Convex Database
    // const createdOrder = await convex.mutation(api.workspace.CreateWorkspace, {
    //     user: userId,
    //     messages: [{role: "user", content:"working"}],
    // });
    const createdOrder = await convex.mutation(api.orders.CreateOrder, {
      userId,
      amount,
      currencyCode: "VND",
      status: "success",
      createdAt: new Date().toISOString(),
      transId: transId.toString(),
    });

     
      

    console.log("✅ Đơn hàng đã được tạo thành công:", JSON.stringify(createdOrder));

    // ✅ Cộng thêm token cho User dựa trên `Lookup`
    const pricingOption = LOOKUP_DATA.PRICING_OPTIONS.find(option => option.price_f === amount);
    if (!pricingOption) {
      console.error("❌ Không tìm thấy gói token phù hợp với số tiền:", amount);
      return new Response(JSON.stringify({ message: "Gói nạp không hợp lệ" }), { status: 400 });
    }

    const tokenToAdd = pricingOption.value;
    console.log(`✅ Cộng thêm ${tokenToAdd} token cho userId: ${userId}`);

    await convex.mutation(api.orders.UpdateToken, {
      userId,
      token: tokenToAdd,
    });


    console.log(`✅ Đã cập nhật token thành công cho user: ${userId}`);

    return new Response(JSON.stringify({ message: "Giao dịch thành công, đơn hàng và token đã được cập nhật!" }), { status: 200 });

  } catch (error) {
    console.error("❌ Lỗi xử lý webhook:", error);
    return new Response(JSON.stringify({ message: "Lỗi xử lý webhook", error: error.message }), { status: 500 });
  }
}
