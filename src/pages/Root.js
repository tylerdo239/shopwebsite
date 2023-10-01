import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import CustomerSuport from "../components/customer-suport/CustomerSup";

// Root Layout of all page that have navbar, footer and customer suport components
function RootLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <CustomerSuport />
      <Footer />
    </div>
  );
}

export default RootLayout;
