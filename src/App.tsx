import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom"; // Ganti BrowserRouter ke HashRouter
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Gunakan HashRouter agar tidak error 404 saat refresh di GitHub Pages */}
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Mengarahkan semua halaman yang tidak dikenal kembali ke Index */}
          <Route path="*" element={<Index />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;