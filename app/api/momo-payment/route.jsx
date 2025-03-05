
import crypto from 'crypto';

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, orderInfo, tokens, userId } = body; // ✅ Nhận userId từ client

    if (isNaN(amount) || amount < 0) {
      return new Response(JSON.stringify({ message: "Số tiền không hợp lệ" }), { status: 400 });
    }

    // 🔥 Lấy thông tin từ biến môi trường
    const accessKey = process.env.MOMO_ACCESS_KEY;
    const secretKey = process.env.MOMO_SECRET_KEY;
    const partnerCode = process.env.MOMO_PARTNER_CODE;
    const redirectUrl = process.env.MOMO_REDIRECT_URL;
    const ipnUrl = process.env.MOMO_IPN_URL;
    const requestType = "payWithMethod";

    // ✅ Tạo orderId và requestId duy nhất
    const orderId = `${partnerCode}_${Date.now()}`;
    const requestId = `${orderId}_REQ`;

    // ✅ Gửi userId vào extraData để Webhook sử dụng
    const extraData = userId; 
    console.log(extraData);
    // ✅ Tạo chữ ký chính xác
    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

    // ✅ Chuẩn bị request gửi lên Momo
    const requestBody = JSON.stringify({
      partnerCode,
      partnerName: "Test Store",
      storeId: "MomoTestStore",
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      lang: "vi",
      tokens,
      requestType,
      autoCapture: true,
      extraData, // ✅ Gửi userId vào extraData
      signature
    });

    console.log("🚀 Dữ liệu gửi đến Momo:", requestBody);

    // ✅ Gửi request đến API Momo
    const response = await fetch("https://test-payment.momo.vn/v2/gateway/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: requestBody
    });

    const responseData = await response.json();
    console.log("🎯 Phản hồi từ Momo:", responseData);

    if (responseData?.payUrl) {
      return new Response(JSON.stringify({ payUrl: responseData.payUrl }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: "Lỗi từ Momo", error: responseData }), { status: 500 });
    }

  } catch (error) {
    console.error("❌ Lỗi xử lý thanh toán:", error);
    return new Response(JSON.stringify({ message: "Lỗi xử lý thanh toán", error: error.message }), { status: 500 });
  }
}
