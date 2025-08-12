import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProtectedRoute from "./components/ProtectedRoute";
import OrderSuccess from "./pages/OrderSuccess";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import Footer from "./components/Footer";

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      {/* <Route path="/" element={<ProductsPage />} /> */}
      <Route path="/" element={<HomePage />} />

      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
      <Route path="/order-success" element={<OrderSuccess />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
