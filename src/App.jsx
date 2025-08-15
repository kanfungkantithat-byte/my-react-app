import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// หน้าหลัก
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';

// ระบบ HRM
import Dashboard from "./pages/hrm/Dashboard";
import Attendance from "./pages/hrm/Attendance"; // ✅ import หน้า Attendance

function App() {
  return (
    <Router>
      <Routes>
        {/* หน้าหลัก */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* ระบบ HRM */}
        <Route path="hrm/dashboard" element={<Dashboard />} />
        <Route path="hrm/attendance" element={<Attendance />} /> {/* ✅ เพิ่ม Route */}
      </Routes>
    </Router>
  );
}

export default App;
