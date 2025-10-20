import { Outlet, Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function AppLayout() {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return <Navigate to="/auth/login" />
  }
  return (
    <div className='font-CircularTTBookRegular flex flex-col'>
      <Navbar />
      <div className='h-[calc(100vh-112px)] bg-white'>
          <Outlet />
      </div>
      <div className='mt-auto'>
        <Footer />
      </div>
    </div>
  )
}