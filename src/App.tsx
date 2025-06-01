
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RequestForBid from "./pages/RequestForBid";
import RFPGeneration from "./pages/RFPGeneration";
import BidPackages from "./pages/BidPackages";
import PackageDetails from "./pages/PackageDetails";
import ContractorProposal from "./pages/ContractorProposal";
import RFBListing from "./pages/RFBListing";
import BidListing from "./pages/BidListing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/request-for-bid" element={<RequestForBid />} />
          <Route path="/rfp-generation" element={<RFPGeneration />} />
          <Route path="/bid-packages" element={<BidPackages />} />
          <Route path="/package-details" element={<PackageDetails />} />
          <Route path="/contractor-proposal" element={<ContractorProposal />} />
          <Route path="/rfb-listing" element={<RFBListing />} />
          <Route path="/bid-listing" element={<BidListing />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
