import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";

import Layout from "./pages/Layout";
import ProductsPage from "./pages/ProductsPage";
import ProductUploadForm from "./pages/ProductUploadForm";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import SignUpPage from "./components/SignUp";
import Logout from "./components/Logout";
import HomePage from "./pages/HomePage.jsx";
import ElectronicsPage from "./pages/ElectronicsPage.jsx";
import FashionPage from "./pages/FashionPage.jsx";
import SportsPage from "./pages/SportsPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import BooksPage from "./pages/BooksPage.jsx";
import IndividualProductPage from "./pages/IndividualProductPage.jsx";
import AdminDashBoard from "./pages/AdminDasboard.jsx";
import AboutUsPage from "./pages/AboutUsPage.jsx";
import ContactUsPage from "./pages/ContactUsPage.jsx";
import CheckOutPage from "./pages/CheckOutPage.jsx";
import OrderHistoryPage from "./pages/OrderHistoryPage.jsx";
import AdminOrders from "./components/AdminOrder.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

// --- Protected route wrapper ---
const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return <div>Loading authentication...</div>;
  if (!isSignedIn) return <Navigate to="/login" replace />;
  return children;
};

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#1f2937", // dark gray
            color: "#fff",
            padding: "12px 16px",
            borderRadius: "10px",
            fontSize: "14px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          },
          success: {
            iconTheme: {
              primary: "#4ade80", // green
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#f87171", // red
              secondary: "#fff",
            },
          },
        }}
        reverseOrder={false}
      />
      <Routes>
        {/* ✅ Layout wraps all public + protected pages */}
        <Route path="/" element={<Layout />}>
          {/* ✅ Public routes */}
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="/api/products" element={<ProductsPage />} />
          <Route path="category/electronics" element={<ElectronicsPage />} />
          <Route path="category/fashion" element={<FashionPage />} />
          <Route path="category/sports" element={<SportsPage />} />
          <Route path="category/books" element={<BooksPage />} />
          <Route path="api/products/:id" element={<IndividualProductPage />} />
          <Route path="admin" element={<AdminDashBoard />} />
          <Route path="api/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/api/orders/create" element={<CheckOutPage />} />
          <Route path="/api/orders/my-orders" element={<OrderHistoryPage />} />
          <Route path="/api/orders/all" element={<AdminOrders />} />

          {/* ✅ Protected routes */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="upload"
            element={
              <ProtectedRoute>
                <ProductUploadForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="logout"
            element={
              <ProtectedRoute>
                <Logout />
              </ProtectedRoute>
            }
          />

          {/* ✅ 404 fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      {/* <Toaster position="bottom-left" reverseOrder={false} /> */}
    </>
  );
};

export default App;
