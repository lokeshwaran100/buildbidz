
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, ArrowLeft, FileText, Send, DollarSign, ChevronRight, ChevronLeft, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PricingTable from "@/components/PricingTable";
import OTPVerification from "@/components/OTPVerification";

interface ProjectData {
  projectName: string;
  plotArea: string;
  floors: string;
  budget: string;
  location: string;
  timeline: string;
  loanRequired: string;
  description: string;
  contactName: string;
  email: string;
  phone: string;
  bidDeadline: string;
  qaDeadline: string;
}

interface RFPCategory {
  id: string;
  title: string;
  description: string;
  specifications: string[];
  comments: string;
  contractorComments: string;
}

interface PricingItem {
  id: string;
  description: string;
  unitRate: number;
  uom: string;
  quantity: number;
  totalPrice: number;
  remarks: string;
}

const ContractorProposal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  
  // Project and form data
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [contractorName, setContractorName] = useState("");
  const [contractorEmail, setContractorEmail] = useState("");
  const [contractorPhone, setContractorPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  
  // Pricing data
  const [finalAmount, setFinalAmount] = useState(0);
  const [pricingItems, setPricingItems] = useState<PricingItem[]>([]);
  
  const [categories, setCategories] = useState<RFPCategory[]>([
    {
      id: "civil",
      title: "Civil Work",
      description: "Foundation, excavation, and structural elements",
      specifications: [
        "Site excavation and leveling as per approved drawings",
        "PCC (Plain Cement Concrete) foundation with M15 grade",
        "RCC (Reinforced Cement Concrete) foundation with M20 grade",
        "Brick masonry work for walls using standard bricks",
        "Plastering for internal and external walls",
        "Flooring work with tiles/marble as specified"
      ],
      comments: "Please ensure quality materials and timely completion as per specifications.",
      contractorComments: ""
    },
    {
      id: "structural",
      title: "Structural Design",
      description: "Load-bearing elements and structural integrity",
      specifications: [
        "Structural design calculations and drawings",
        "RCC columns with M25 grade concrete",
        "RCC beams and slabs as per structural design",
        "Steel reinforcement as per IS codes",
        "Earthquake-resistant design compliance",
        "Structural safety certifications"
      ],
      comments: "All structural work must comply with local building codes and safety standards.",
      contractorComments: ""
    },
    {
      id: "electrical",
      title: "Electrical Work",
      description: "Complete electrical installation and wiring",
      specifications: [
        "Internal wiring with copper conductors",
        "Main electrical panel and distribution boards",
        "Power outlets and switch points as per layout",
        "Light fixtures and ceiling fans installation",
        "Earthing and safety measures",
        "Electrical safety certificates and approvals"
      ],
      comments: "Use ISI marked electrical components and ensure proper earthing.",
      contractorComments: ""
    },
    {
      id: "plumbing",
      title: "Plumbing Work",
      description: "Water supply and drainage systems",
      specifications: [
        "Water supply piping with CPVC/PPR pipes",
        "Drainage system with PVC pipes",
        "Bathroom fixtures and fittings",
        "Kitchen sink and plumbing connections",
        "Water tank installation and connections",
        "Plumbing safety and pressure testing"
      ],
      comments: "Ensure leak-proof installations and use branded fixtures.",
      contractorComments: ""
    },
    {
      id: "painting",
      title: "Painting & Finishing",
      description: "Interior and exterior painting work",
      specifications: [
        "Wall preparation and primer application",
        "Interior painting with premium emulsion",
        "Exterior painting with weather-resistant paint",
        "Ceiling painting and finishing",
        "Wood work painting and polishing",
        "Final touch-ups and quality checks"
      ],
      comments: "Use premium quality paints with proper surface preparation.",
      contractorComments: ""
    },
    {
      id: "others",
      title: "Other Specifications",
      description: "Additional requirements and miscellaneous work",
      specifications: [
        "Door and window installation",
        "Roofing and waterproofing",
        "Staircase construction",
        "Boundary wall construction",
        "Landscaping and external work",
        "Final cleaning and handover"
      ],
      comments: "Complete finishing work including cleaning and final handover documentation.",
      contractorComments: ""
    }
  ]);

  useEffect(() => {
    if (location.state?.projectData) {
      setProjectData(location.state.projectData);
    }
  }, [location]);

  const handleContractorCommentChange = (categoryId: string, comment: string) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId ? { ...cat, contractorComments: comment } : cat
    ));
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate step 1
      if (!contractorName || !contractorEmail || !companyName) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields before proceeding.",
          variant: "destructive"
        });
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmitBid = () => {
    if (finalAmount === 0) {
      toast({
        title: "Invalid Bid Amount",
        description: "Please enter valid pricing information.",
        variant: "destructive"
      });
      return;
    }
    setShowOTPVerification(true);
  };

  const handleOTPVerified = () => {
    const proposal = {
      projectData,
      contractorName,
      contractorEmail,
      contractorPhone,
      companyName,
      categories,
      pricingItems,
      finalAmount,
      submittedAt: new Date().toISOString()
    };

    console.log("Proposal submitted:", proposal);
    
    toast({
      title: "Bid Submitted Successfully!",
      description: `Your bid of ₹${finalAmount.toLocaleString()} has been submitted for ${projectData?.projectName}.`
    });

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  if (!projectData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading RFP data...</p>
        </div>
      </div>
    );
  }

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
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Step Progress */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-8">
            <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                <User className="w-4 h-4" />
              </div>
              <span className="font-medium">RFP Details & Comments</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                <DollarSign className="w-4 h-4" />
              </div>
              <span className="font-medium">Pricing Information</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <FileText className="w-10 h-10 mr-4 text-blue-600" />
              Submit Your Proposal
            </h2>
            <p className="text-xl text-gray-600 mb-2">
              For: <span className="font-semibold">{projectData.projectName}</span>
            </p>
          </div>

          {/* Step 1: RFP Details & Comments */}
          {currentStep === 1 && (
            <div className="space-y-8">
              {/* Project Summary Card */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Project Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div><span className="font-medium">Location:</span> {projectData.location}</div>
                    <div><span className="font-medium">Plot Area:</span> {projectData.plotArea} sq ft</div>
                    <div><span className="font-medium">Floors:</span> {projectData.floors}</div>
                    <div><span className="font-medium">Budget:</span> {projectData.budget}</div>
                    <div><span className="font-medium">Timeline:</span> {projectData.timeline}</div>
                    <div><span className="font-medium">Bid Deadline:</span> {projectData.bidDeadline}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Contractor Information */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Your Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                          Company Name *
                        </Label>
                        <Input
                          id="companyName"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Enter your company name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="contractorName" className="text-sm font-medium text-gray-700">
                          Contact Person *
                        </Label>
                        <Input
                          id="contractorName"
                          value={contractorName}
                          onChange={(e) => setContractorName(e.target.value)}
                          placeholder="Enter contact person name"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="contractorEmail" className="text-sm font-medium text-gray-700">
                          Email Address *
                        </Label>
                        <Input
                          id="contractorEmail"
                          type="email"
                          value={contractorEmail}
                          onChange={(e) => setContractorEmail(e.target.value)}
                          placeholder="Enter email address"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="contractorPhone" className="text-sm font-medium text-gray-700">
                          Phone Number
                        </Label>
                        <Input
                          id="contractorPhone"
                          value={contractorPhone}
                          onChange={(e) => setContractorPhone(e.target.value)}
                          placeholder="Enter phone number"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* RFP Categories with Comments */}
              <div className="space-y-6">
                {categories.map((category, index) => (
                  <Card key={category.id} className="bg-white shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                        <Badge className="mr-3 bg-blue-600 text-white">{index + 1}</Badge>
                        {category.title}
                      </CardTitle>
                      <p className="text-gray-600">{category.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Specifications:</h4>
                          <ul className="space-y-2">
                            {category.specifications.map((spec, specIndex) => (
                              <li key={specIndex} className="flex items-start space-x-3">
                                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                                <span className="text-gray-700">{spec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {category.comments && (
                          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                            <h4 className="font-semibold text-gray-900 mb-2">Customer Requirements:</h4>
                            <p className="text-gray-700">{category.comments}</p>
                          </div>
                        )}
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Your Response & Comments:</h4>
                          <Textarea
                            placeholder={`Add your response to customer requirements and any specific details for ${category.title.toLowerCase()}...`}
                            value={category.contractorComments}
                            onChange={(e) => handleContractorCommentChange(category.id, e.target.value)}
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-end mt-8">
                <Button onClick={handleNextStep} size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Next: Pricing Information
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Pricing Information */}
          {currentStep === 2 && (
            <div className="space-y-8">
              {/* Brief Project Summary */}
              <Card className="bg-blue-50 border-blue-200 shadow-lg">
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div><span className="font-medium">Project:</span> {projectData.projectName}</div>
                    <div><span className="font-medium">Location:</span> {projectData.location}</div>
                    <div><span className="font-medium">Budget:</span> {projectData.budget}</div>
                    <div><span className="font-medium">Timeline:</span> {projectData.timeline}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Table */}
              <PricingTable 
                onTotalChange={setFinalAmount}
                onItemsChange={setPricingItems}
              />

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <Button onClick={handlePreviousStep} variant="outline" size="lg">
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous: RFP Details
                </Button>
                <Button 
                  onClick={handleSubmitBid}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-12"
                >
                  <Send className="w-6 h-6 mr-3" />
                  Submit Bid
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* OTP Verification Modal */}
      {showOTPVerification && (
        <OTPVerification
          onVerify={handleOTPVerified}
          onCancel={() => setShowOTPVerification(false)}
          contractorEmail={contractorEmail}
        />
      )}
    </div>
  );
};

export default ContractorProposal;
