import dedent from 'dedent';

export default {
  CHAT_PROMPT: dedent`
  'Bạn là một trợ lý AI có kinh nghiệm trong phát triển React.
  HƯỚNG DẪN:
  - Cho người dùng biết bạn đang xây dựng gì.
  - Phản hồi không quá 15 dòng.
  - Bỏ qua các ví dụ mã nguồn và phần bình luận.'
`,

  CODE_GEN_PROMPT: dedent`
Tạo một dự án React. Xây dựng nhiều component và tổ chức chúng trong các thư mục riêng biệt với phần mở rộng tệp .js nếu cần. Kết quả đầu ra phải sử dụng Tailwind CSS để tạo kiểu mà không có bất kỳ thư viện hoặc phụ thuộc bên thứ ba nào, ngoại trừ các biểu tượng từ thư viện lucide-react, chỉ sử dụng khi cần thiết. Các biểu tượng có sẵn bao gồm: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X và ArrowRight. Ví dụ, bạn có thể nhập biểu tượng như sau:  
\`import { Heart } from "lucide-react"\`  
và sử dụng trong JSX như:  
\`<Heart className="" />\`.  

Bạn cũng có thể sử dụng thư viện date-fns để định dạng ngày tháng và react-chartjs-2 để tạo biểu đồ và đồ thị.

Trả về phản hồi ở định dạng JSON với cấu trúc sau:
\`\`\`json
{
  "projectTitle": "",
  "explanation": "",
  "files": {
    "/App.js": {
      "code": ""
    },
    ...
  },
  "generatedFiles": []
}
\`\`\`

Hãy đảm bảo trường \`files\` chứa tất cả các tệp được tạo, và trường \`generatedFiles\` liệt kê tất cả tên tệp. Mã nguồn của từng tệp phải được đặt trong trường \`code\`, theo ví dụ sau:
\`\`\`json
"files": {
  "/App.js": {
    "code": "import React from 'react';\nimport './styles.css';\nexport default function App() {\n  return (\n    <div className='p-4 bg-gray-100 text-center'>\n      <h1 className='text-2xl font-bold text-blue-500'>Hello, Tailwind CSS with Sandpack!</h1>\n      <p className='mt-2 text-gray-700'>This is a live code editor.</p>\n    </div>\n  );\n}"
  }
}
\`\`\`

Không sử dụng định dạng sau:
\`\`\`json
"files": {
  "src/App.js": { ... }
}
\`\`\`

Ngoài ra, hãy bao gồm một đoạn giải thích về cấu trúc dự án, mục đích và chức năng trong trường \`explanation\`. Hãy làm cho phản hồi súc tích và rõ ràng trong một đoạn văn duy nhất.

- Chỉ sử dụng các gói sau khi được yêu cầu hoặc thực sự cần thiết: date-fns, react-chartjs-2, firebase, @google/generative-ai.  
- Với hình ảnh giữ chỗ, hãy sử dụng đường dẫn: [https://archive.org/download/placeholder-image/placeholder-image.jpg](https://archive.org/download/placeholder-image/placeholder-image.jpg).  
- Thêm biểu tượng cảm xúc khi cần thiết để nâng cao trải nghiệm người dùng.  
- Tất cả thiết kế phải đẹp mắt, không mang tính chất rập khuôn. Các trang web phải đầy đủ tính năng và sẵn sàng cho sản xuất.  
- Theo mặc định, mẫu này hỗ trợ cú pháp JSX với lớp Tailwind CSS, React hooks và Lucide React cho biểu tượng. Không cài đặt các gói UI khác trừ khi thực sự cần thiết hoặc được yêu cầu.  
- Sử dụng biểu tượng từ lucide-react cho logo.  
- Sử dụng ảnh từ Unsplash nếu phù hợp, chỉ liên kết đến các URL hợp lệ.

  `,

  DEPENDANCY: {
    postcss: '^8',
    tailwindcss: '^3.4.1',
    autoprefixer: '^10.0.0',
    uuid4: '^2.0.3',
    'tailwind-merge': '^2.4.0',
    'tailwindcss-animate': '^1.0.7',
    'lucide-react': '^0.469.0',
    'react-router-dom': '^7.1.1',
    firebase: '^11.1.0',
    '@google/generative-ai': '^0.21.0',
    'date-fns': '^4.1.0',
    'react-chartjs-2': '^5.3.0',
    'chart.js': '^4.4.7',
  },

  DEFAULT_FILE: {
    '/public/index.html': {
      code: `<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tài liệu</title>
    <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
    },

    '/App.css': {
      code: `
            @tailwind base;
@tailwind components;
@tailwind utilities;`,
    },

    '/tailwind.config.js': {
      code: `
            /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`,
    },

    '/postcss.config.js': {
      code: `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;
`,
    },
  },
};
