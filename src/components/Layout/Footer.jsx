import { Link } from "react-router-dom";

const Footer = () => {
    return (
      <footer className="bg-gray-100 text-gray-800 mt-8">
        {/* Phần đăng ký nhận tin và kết nối */}
        
  
        {/* Nội dung chính */}
        <div className="py-8 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Cột 1: Thông tin công ty */}
          <div>
            <h3 className="font-semibold">Wedesign graphic design website</h3>
            <p>🏠  - - - -</p>
            <p>📍  - - - -</p>
            <p>📞 1234 56 78 90</p>
            <p>✉️ wedesign-lemon.vercel.app</p>
          </div>
  
          
  
          {/* Cột 3: Hỗ trợ khách hàng */}
          <div>
            <h3 className="font-semibold">Customer support</h3>
            <ul className="space-y-2">
              <li>- - -</li>
              <li>- - -</li>
              <li>- - -</li>
              <li>- - -</li>
            </ul>
          </div>
  
          {/* Cột 4: Chính sách */}
          <div>
            <h3 className="font-semibold">Policy</h3>
            <ul className="space-y-2">
              <li>- - -</li>
              <li>- - -</li>
              <li>- - -</li>
              <li>- - -</li>
            </ul>
          </div>
        </div>
  
        {/* Copyright */}
        <div className="bg-gray-200 text-center py-4 text-sm">
          Copyright © {new Date().getFullYear()} Baya. Powered by Haravan
        </div>
      </footer>
    );
  };
  
  export default Footer;
  