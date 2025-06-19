
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { Header } from "@/components/layout/Header";
import { Navigation } from "@/components/layout/Navigation";
import Index from "./pages/Index";
import Today from "./pages/Today";
import Featured from "./pages/Featured";
import Collections from "./pages/Collections";
import Community from "./pages/Community";
import ProductDetail from "./pages/ProductDetail";
import Submit from "./pages/Submit";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Header />
            <Navigation />
            <main className="container mx-auto py-8">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/today" element={<Today />} />
                <Route path="/featured" element={<Featured />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/community" element={<Community />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/submit" element={<Submit />} />
                <Route path="/@:username" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/search" element={<Search />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
