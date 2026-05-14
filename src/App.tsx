import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index.tsx";
import PhilosophyPage from "./pages/PhilosophyPage.tsx";
import PromisePage from "./pages/PromisePage.tsx";
import RangePage from "./pages/RangePage.tsx";
import TracePage from "./pages/TracePage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import AdminLayout from "./admin/AdminLayout.tsx";
import AdminLogin from "./admin/pages/AdminLogin.tsx";
import AdminDashboard from "./admin/pages/AdminDashboard.tsx";
import AdminAnalytics from "./admin/pages/AdminAnalytics.tsx";
import ProtectedAdminRoute from "./admin/ProtectedAdminRoute.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/philosophy" element={<PhilosophyPage />} />
          <Route path="/promise" element={<PromisePage />} />
          <Route path="/range" element={<RangePage />} />
          <Route path="/trace" element={<TracePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="analytics" element={<AdminAnalytics />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
