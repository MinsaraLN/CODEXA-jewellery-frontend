import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GoldJewelry from "./pages/GoldJewelry";
import Gems from "./pages/Gems";
import AngelCollection from "./pages/AngelCollection";
import Offers from "./pages/Offers";
import About from "./pages/About";
import CustomDesigns from "./pages/CustomDesigns";
import Repairs from "./pages/Repairs";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import RequireAdmin from "@/routes/RequireAdmin";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminHome from "@/pages/admin/AdminHome";
import AdminEntityAll from "@/pages/admin/AdminEntityAll";
import AdminEntityManage from "@/pages/admin/AdminEntityManage";
import ProductCreate from "@/pages/admin/ProductCreate"; // (we'll add this file next)


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/gold" element={<GoldJewelry />} />
                <Route path="/gems" element={<Gems />} />
                <Route path="/Gems" element={<Gems />} />
                <Route path="/angel-collection" element={<AngelCollection />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/about" element={<About />} />
                <Route path="/custom-designs" element={<CustomDesigns />} />
                <Route path="/repairs" element={<Repairs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/product/:slug" element={<ProductDetail />} />
                <Route path="*" element={<NotFound />} />
                <Route
                  path="/admin"
                  element={
                    <RequireAdmin>
                      <AdminLayout />
                    </RequireAdmin>
                  }
                >
                  <Route index element={<AdminHome />} />
                  <Route path=":entity" element={<AdminEntityAll />} />
                  <Route path=":entity/manage" element={<AdminEntityManage />} />
                  <Route path="products/create" element={<ProductCreate />} /> {/* <-- add this */}
                </Route>

              </Routes>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
