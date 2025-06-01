
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Home, Search, Filter, MapPin, Calendar, DollarSign, Clock, Eye } from "lucide-react";

interface RFBData {
  id: string;
  projectName: string;
  plotArea: string;
  floors: string;
  budget: string;
  location: string;
  state: string;
  district: string;
  taluk: string;
  timeline: string;
  loanRequired: string;
  description: string;
  contactName: string;
  email: string;
  phone: string;
  bidDeadline: string;
  qaDeadline: string;
  status: "Open" | "Closed";
  postedDate: string;
}

// Mock data for RFBs
const mockRFBs: RFBData[] = [
  {
    id: "1",
    projectName: "Modern Villa Construction",
    plotArea: "2500",
    floors: "2",
    budget: "₹50-75 Lakhs",
    location: "Bangalore, Karnataka",
    state: "Karnataka",
    district: "Bangalore Urban",
    taluk: "Bangalore South",
    timeline: "12 months",
    loanRequired: "Yes",
    description: "Construction of a modern 4BHK villa with contemporary design.",
    contactName: "Rajesh Kumar",
    email: "rajesh@email.com",
    phone: "+91 9876543210",
    bidDeadline: "2024-07-15",
    qaDeadline: "2024-07-10",
    status: "Open",
    postedDate: "2024-06-15"
  },
  {
    id: "2",
    projectName: "Commercial Complex Development",
    plotArea: "5000",
    floors: "4",
    budget: "₹2-3 Crores",
    location: "Mumbai, Maharashtra",
    state: "Maharashtra",
    district: "Mumbai",
    taluk: "Andheri",
    timeline: "18 months",
    loanRequired: "No",
    description: "Construction of a commercial complex with retail and office spaces.",
    contactName: "Priya Sharma",
    email: "priya@email.com",
    phone: "+91 9876543211",
    bidDeadline: "2024-07-20",
    qaDeadline: "2024-07-15",
    status: "Open",
    postedDate: "2024-06-10"
  },
  {
    id: "3",
    projectName: "Residential Apartment Block",
    plotArea: "3000",
    floors: "3",
    budget: "₹1-1.5 Crores",
    location: "Chennai, Tamil Nadu",
    state: "Tamil Nadu",
    district: "Chennai",
    taluk: "Tambaram",
    timeline: "15 months",
    loanRequired: "Yes",
    description: "Construction of a 12-unit residential apartment block.",
    contactName: "Arun Patel",
    email: "arun@email.com",
    phone: "+91 9876543212",
    bidDeadline: "2024-06-30",
    qaDeadline: "2024-06-25",
    status: "Closed",
    postedDate: "2024-05-20"
  },
  {
    id: "4",
    projectName: "Luxury Farmhouse",
    plotArea: "4000",
    floors: "2",
    budget: "₹75 Lakhs - 1 Crore",
    location: "Pune, Maharashtra",
    state: "Maharashtra",
    district: "Pune",
    taluk: "Mulshi",
    timeline: "10 months",
    loanRequired: "No",
    description: "Construction of a luxury farmhouse with modern amenities.",
    contactName: "Deepika Singh",
    email: "deepika@email.com",
    phone: "+91 9876543213",
    bidDeadline: "2024-08-01",
    qaDeadline: "2024-07-25",
    status: "Open",
    postedDate: "2024-06-20"
  }
];

const RFBListing = () => {
  const [rfbs, setRfbs] = useState<RFBData[]>(mockRFBs);
  const [filteredRfbs, setFilteredRfbs] = useState<RFBData[]>(mockRFBs);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [budgetFilter, setBudgetFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [deadlineFilter, setDeadlineFilter] = useState<string>("all");

  useEffect(() => {
    filterRFBs();
  }, [searchTerm, statusFilter, budgetFilter, locationFilter, deadlineFilter]);

  const filterRFBs = () => {
    let filtered = rfbs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(rfb =>
        rfb.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rfb.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rfb.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(rfb => rfb.status === statusFilter);
    }

    // Budget filter
    if (budgetFilter !== "all") {
      filtered = filtered.filter(rfb => {
        const budget = rfb.budget.toLowerCase();
        switch (budgetFilter) {
          case "under-50":
            return budget.includes("50") && !budget.includes("75") && !budget.includes("crore");
          case "50-100":
            return budget.includes("50") || budget.includes("75") || budget.includes("1 crore");
          case "above-100":
            return budget.includes("crore") && !budget.includes("1 crore");
          default:
            return true;
        }
      });
    }

    // Location filter
    if (locationFilter !== "all") {
      filtered = filtered.filter(rfb => rfb.state === locationFilter);
    }

    // Deadline filter
    if (deadlineFilter !== "all") {
      const today = new Date();
      filtered = filtered.filter(rfb => {
        const deadline = new Date(rfb.bidDeadline);
        const daysUntilDeadline = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (deadlineFilter) {
          case "urgent":
            return daysUntilDeadline <= 7 && daysUntilDeadline >= 0;
          case "this-month":
            return daysUntilDeadline <= 30 && daysUntilDeadline >= 0;
          case "expired":
            return daysUntilDeadline < 0;
          default:
            return true;
        }
      });
    }

    setFilteredRfbs(filtered);
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDeadlineColor = (deadline: string) => {
    const days = getDaysUntilDeadline(deadline);
    if (days < 0) return "bg-red-500";
    if (days <= 3) return "bg-red-400";
    if (days <= 7) return "bg-yellow-400";
    return "bg-green-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">BuildBidz</h1>
          </div>
          <Link to="/">
            <Button variant="ghost" className="text-blue-600 hover:bg-blue-50">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Available RFB Opportunities
          </h2>
          <p className="text-xl text-gray-600">
            Browse and submit proposals for construction projects
          </p>
        </div>

        {/* Filters Section */}
        <Card className="mb-8 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-bold text-gray-900">
              <Filter className="w-6 h-6 mr-2 text-blue-600" />
              Filter RFBs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {/* Search */}
              <div className="xl:col-span-2">
                <Label htmlFor="search" className="text-sm font-medium text-gray-700 mb-2 block">
                  Search RFBs
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="search"
                    placeholder="Search by project name, location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Status
                </Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Budget Filter */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Budget Range
                </Label>
                <Select value={budgetFilter} onValueChange={setBudgetFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Budgets" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Budgets</SelectItem>
                    <SelectItem value="under-50">Under ₹50 Lakhs</SelectItem>
                    <SelectItem value="50-100">₹50L - ₹1 Crore</SelectItem>
                    <SelectItem value="above-100">Above ₹1 Crore</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Deadline Filter */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Deadline
                </Label>
                <Select value={deadlineFilter} onValueChange={setDeadlineFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Deadlines" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Deadlines</SelectItem>
                    <SelectItem value="urgent">Urgent (≤7 days)</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredRfbs.length}</span> of{" "}
            <span className="font-semibold">{rfbs.length}</span> RFBs
          </p>
        </div>

        {/* RFB Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRfbs.map((rfb) => (
            <Card key={rfb.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2">
                    {rfb.projectName}
                  </CardTitle>
                  <Badge
                    className={`${
                      rfb.status === "Open" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    } font-medium`}
                  >
                    {rfb.status}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{rfb.state}, {rfb.district}, {rfb.taluk}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Deadlines */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-red-500" />
                      <span className="font-medium">Bid Deadline:</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{rfb.bidDeadline}</span>
                      <div className={`w-3 h-3 rounded-full ${getDeadlineColor(rfb.bidDeadline)}`}></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="font-medium">Q&A Deadline:</span>
                    </div>
                    <span className="text-sm">{rfb.qaDeadline}</span>
                  </div>
                </div>

                {/* Budget */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm">
                    <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                    <span className="font-medium">Budget:</span>
                  </div>
                  <span className="text-sm font-semibold text-green-600">{rfb.budget}</span>
                </div>

                {/* Timeline */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Timeline:</span>
                  <span className="text-sm">{rfb.timeline}</span>
                </div>

                {/* Plot Area & Floors */}
                <div className="flex justify-between text-sm">
                  <span><span className="font-medium">Area:</span> {rfb.plotArea} sq ft</span>
                  <span><span className="font-medium">Floors:</span> {rfb.floors}</span>
                </div>

                {/* Days remaining */}
                {rfb.status === "Open" && (
                  <div className="text-center">
                    {getDaysUntilDeadline(rfb.bidDeadline) >= 0 ? (
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                        getDaysUntilDeadline(rfb.bidDeadline) <= 3 
                          ? "bg-red-100 text-red-700" 
                          : getDaysUntilDeadline(rfb.bidDeadline) <= 7
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}>
                        {getDaysUntilDeadline(rfb.bidDeadline)} days remaining
                      </span>
                    ) : (
                      <span className="text-sm font-medium px-3 py-1 rounded-full bg-red-100 text-red-700">
                        Deadline passed
                      </span>
                    )}
                  </div>
                )}

                {/* View Details Button */}
                <Link
                  to="/contractor-proposal"
                  state={{ projectData: rfb }}
                  className="block"
                >
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    disabled={rfb.status === "Closed"}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details & Submit Proposal
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredRfbs.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No RFBs Found</h3>
              <p className="text-gray-600">
                Try adjusting your filters or search terms to find more opportunities.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default RFBListing;
