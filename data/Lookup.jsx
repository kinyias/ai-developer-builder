// //Dung cho trang price
// const LOOKUP_DATA = {
//     DEFAULT_FILE: {
//       name: 'default.txt',
//       size: '0KB',
//       type: 'text/plain',
//     },
  
//     DEPENDANCY: {
//       required: ['React', 'Next.js', 'Convex', 'Clerk'],
//       optional: ['TailwindCSS', 'ShadCN'],
//     },
  
//     PRICING_DESC: 'Bắt đầu với một tài khoản miễn phí để tăng tốc quy trình làm việc trên nền tảng của chúng tôi.',
  
//     PRICING_OPTIONS: [
//       {
//         name: 'Miễn phí',
//         tokens: '50K',
//         value: 50000,
//         desc: 'Dành cho người dùng cá nhân muốn trải nghiệm cơ bản.',
//         price: 'Miễn phí',
//       },
//       {
//         name: 'Cơ bản',
//         tokens: '200K',
//         value: 200000,
//         desc: 'Phù hợp với cá nhân hoặc nhóm nhỏ, sử dụng trung bình.',
//         price: '49K VND / tháng',
//       },
//       {
//         name: 'Nâng cao',
//         tokens: '500K',
//         value: 500000,
//         desc: 'Dành cho các doanh nghiệp nhỏ, yêu cầu sử dụng nhiều hơn.',
//         price: '149K VND / tháng',
//       },
//       {
//         name: 'Doanh nghiệp',
//         tokens: '1M+',
//         value: 1000000,
//         desc: 'Gói không giới hạn, phù hợp với doanh nghiệp lớn.',
//         price: 'Liên hệ',
//       }
//     ],
    
//   };
  
//   export default LOOKUP_DATA;
  
// Dùng cho trang price
const LOOKUP_DATA = {
  DEFAULT_FILE: {
    name: 'default.txt',
    size: '0KB',
    type: 'text/plain',
  },

  DEPENDANCY: {
    required: ['React', 'Next.js', 'Convex', 'Clerk'],
    optional: ['TailwindCSS', 'ShadCN'],
  },

  PRICING_DESC: 'Bắt đầu với một tài khoản miễn phí để tăng tốc quy trình làm việc trên nền tảng của chúng tôi.',

  PRICING_OPTIONS: [
    {
      
      name: 'Miễn phí',
      tokens: '50K',
      value: 50000,
      desc: 'Dành cho người dùng cá nhân muốn trải nghiệm cơ bản.',
      price: 'Miễn phí',
      price_f: 0,  // Giá miễn phí
    },
    {
      name: 'Cơ bản',
      tokens: '200K',
      value: 200000,
      desc: 'Phù hợp với cá nhân hoặc nhóm nhỏ, sử dụng trung bình.',
      price: '49K VND / tháng',
      price_f: 49000,  // Chuyển "49K" thành số float
    },
    {
      name: 'Nâng cao',
      tokens: '500K',
      value: 500000,
      desc: 'Dành cho các doanh nghiệp nhỏ, yêu cầu sử dụng nhiều hơn.',
      price: '149K VND / tháng',
      price_f: 149000,  // Chuyển "149K" thành số float
    },
    {
      name: 'Doanh nghiệp',
      tokens: '1M+',
      value: 1000000,
      desc: 'Gói không giới hạn, phù hợp với doanh nghiệp lớn.',
      price: 'Liên hệ',
      price_f: 298000,  // Giá liên hệ không có số cụ thể
    }
  ],
};

export default LOOKUP_DATA;
