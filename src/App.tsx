import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CartProvider } from "./shop/context/CartContext";
import Index from "./pages/Index.tsx";
import PhilosophyPage from "./pages/PhilosophyPage.tsx";
import PromisePage from "./pages/PromisePage.tsx";
import RangePage from "./pages/RangePage.tsx";
import TracePage from "./pages/TracePage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import ShopPage from "./shop/pages/ShopPage.tsx";
import CartPage from "./shop/pages/CartPage.tsx";
import CheckoutPage from "./shop/pages/CheckoutPage.tsx";
import OrdersPage from "./shop/pages/OrdersPage.tsx";
import LoginPage from "./shop/pages/LoginPage.tsx";
import RegisterPage from "./shop/pages/RegisterPage.tsx";
import ProtectedUserRoute from "./shop/ProtectedUserRoute.tsx";
import AdminLayout from "./admin/AdminLayout.tsx";
import AdminLogin from "./admin/pages/AdminLogin.tsx";
import AdminDashboard from "./admin/pages/AdminDashboard.tsx";
import AdminAnalytics from "./admin/pages/AdminAnalytics.tsx";
import AdminProducts from "./admin/pages/AdminProducts.tsx";
import AdminOrders from "./admin/pages/AdminOrders.tsx";
import AdminCustomers from "./admin/pages/AdminCustomers.tsx";
import AdminContent from "./admin/pages/AdminContent.tsx";
import ProtectedAdminRoute from "./admin/ProtectedAdminRoute.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CartProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/philosophy" element={<PhilosophyPage />} />
            <Route path="/promise" element={<PromisePage />} />
            <Route path="/range" element={<RangePage />} />
            <Route path="/trace" element={<TracePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/checkout" element={<ProtectedUserRoute><CheckoutPage /></ProtectedUserRoute>} />
            <Route path="/orders" element={<ProtectedUserRoute><OrdersPage /></ProtectedUserRoute>} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="content" element={<AdminContent />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
