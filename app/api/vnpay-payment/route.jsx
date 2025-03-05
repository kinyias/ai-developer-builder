import moment from 'moment';
import querystring from 'qs';
import crypto from 'crypto';

export async function POST(req) {  //  Next.js App Router dùng export function
  try {
    const body = await req.json();  //  Đọc JSON từ request
    const { amount, language } = body;

    if (isNaN(amount) || amount < 0) { //
      return new Response(JSON.stringify({ message: "Số tiền không hợp lệ" }), { status: 400 });
    }

    process.env.TZ = 'Asia/Ho_Chi_Minh';
    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    let orderRef = moment(date).format('DDHHmmss');

    let tmnCode = process.env.VNP_TMN_CODE;
    let secretKey = process.env.VNP_HASH_SECRET;
    let vnpUrl = process.env.VNP_URL;
    let returnUrl = process.env.VNP_RETURN_URL;

    let vnp_Params = {
      'vnp_Version': '2.1.0',
      'vnp_Command': 'pay',
      'vnp_TmnCode': tmnCode,
      'vnp_Locale': language || 'vn',
      'vnp_CurrCode': 'VND',
      'vnp_TxnRef': orderRef,
      'vnp_OrderInfo': `Thanh toán đơn hàng ${orderRef}`,
      'vnp_OrderType': 'other',
      // 'vnp_Amount': amount * 100,
      'vnp_Amount': Math.round(amount * 100),
      
      'vnp_ReturnUrl': returnUrl,
      'vnp_CreateDate': createDate
    };
    console.log("aaaaaa", JSON.stringify(vnp_Params, null, 2));
    // Sắp xếp tham số theo thứ tự alphabet trước khi tạo chữ ký
      const sortedParams = Object.fromEntries(Object.entries(vnp_Params).sort());
      const signData = querystring.stringify(sortedParams, { encode: false });

      const hmac = crypto.createHmac("sha512", secretKey);
      const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
      vnp_Params['vnp_SecureHash'] = signed;

    // console.log(" Dữ liệu gửi đến VNPAY:", JSON.stringify(vnp_Params, null, 2));
    return new Response(JSON.stringify({ payUrl: `${vnpUrl}?${querystring.stringify(vnp_Params, { encode: false })}` }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });


  } catch (error) {
    return new Response(JSON.stringify({ message: "Lỗi xử lý thanh toán", error: error.message }), { status: 500 });
  }
}
