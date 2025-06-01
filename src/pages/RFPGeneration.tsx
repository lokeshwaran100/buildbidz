
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, ArrowLeft, FileText, Clock, Send } from "lucide-react";

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
}

const RFPGeneration = () => {
  const location = useLocation();
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [currentCategoryIndex, setCCurrentCategoryIndex] = useState(0);
  const [currentSpecIndex, setCurrentSpecIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
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
      comments: ""
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
      comments: ""
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
      comments: ""
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
      comments: ""
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
      comments: ""
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
      comments: ""
    }
  ]);

  useEffect(() => {
    if (location.state?.projectData) {
      setProjectData(location.state.projectData);
    }
  }, [location]);

  useEffect(() => {
    if (!isGenerating) return;

    const currentCategory = categories[currentCategoryIndex];
    const currentSpec = currentCategory?.specifications[currentSpecIndex];

    if (!currentSpec) {
      if (currentCategoryIndex < categories.length - 1) {
        setCCurrentCategoryIndex(currentCategoryIndex + 1);
        setCurrentSpecIndex(0);
        setDisplayedText("");
      } else {
        setIsGenerating(false);
      }
      return;
    }

    if (displayedText.length < currentSpec.length) {
      const timer = setTimeout(() => {
        setDisplayedText(currentSpec.slice(0, displayedText.length + 1));
      }, 30);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentSpecIndex(currentSpecIndex + 1);
        setDisplayedText("");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [displayedText, currentCategoryIndex, currentSpecIndex, categories, isGenerating]);

  const handleCommentChange = (categoryId: string, comment: string) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId ? { ...cat, comments: comment } : cat
    ));
  };

  const generateRFPDocument = () => {
    console.log("Generating final RFP document with comments:", categories);
    // This would typically generate a PDF or navigate to next step
  };

  if (!projectData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading project data...</p>
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
          <Link to="/request-for-bid">
            <Button variant="ghost" className="text-blue-600 hover:bg-blue-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Form
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <FileText className="w-10 h-10 mr-4 text-blue-600" />
              Request for Proposal (RFP)
            </h2>
            <p className="text-xl text-gray-600 mb-2">
              For: <span className="font-semibold">{projectData?.projectName}</span>
            </p>
            {isGenerating && (
              <div className="flex items-center justify-center text-blue-600">
                <Clock className="w-5 h-5 mr-2 animate-spin" />
                <span>AI is generating your RFP specifications...</span>
              </div>
            )}
          </div>

          {/* Project Summary Card */}
          <Card className="mb-8 bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Project Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div><span className="font-medium">Location:</span> {projectData?.location}</div>
                <div><span className="font-medium">Plot Area:</span> {projectData?.plotArea} sq ft</div>
                <div><span className="font-medium">Floors:</span> {projectData?.floors}</div>
                <div><span className="font-medium">Budget:</span> {projectData?.budget}</div>
                <div><span className="font-medium">Timeline:</span> {projectData?.timeline}</div>
                <div><span className="font-medium">Bid Deadline:</span> {projectData?.bidDeadline}</div>
              </div>
            </CardContent>
          </Card>

          {/* Important Notice */}
          <Card className="mb-8 bg-yellow-50 border-yellow-200">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Badge className="bg-yellow-500 text-white">Important</Badge>
                <div>
                  <p className="text-gray-800 font-medium">Government Approvals & Permits</p>
                  <p className="text-gray-600 text-sm mt-1">
                    All government approvals, permits, and legal compliances will be the responsibility of the customer. 
                    Contractors will provide assistance and guidance but final approvals must be obtained by the project owner.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* RFP Categories */}
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
                            <span className="text-gray-700">
                              {index === currentCategoryIndex && specIndex === currentSpecIndex && isGenerating
                                ? displayedText + (displayedText.length < spec.length ? '|' : '')
                                : index < currentCategoryIndex || (index === currentCategoryIndex && specIndex < currentSpecIndex) || !isGenerating
                                ? spec
                                : ''
                              }
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {(index < currentCategoryIndex || !isGenerating) && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Your Comments & Modifications:</h4>
                        <Textarea
                          placeholder={`Add your specific requirements, modifications, or comments for ${category.title.toLowerCase()}...`}
                          value={category.comments}
                          onChange={(e) => handleCommentChange(category.id, e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          {!isGenerating && (
            <div className="mt-12 text-center space-y-4">
              <div className="flex justify-center space-x-4">
                <Link to="/bid-packages" state={{ projectData }}>
                  <Button 
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                  >
                    Proceed to Package Selection
                  </Button>
                </Link>
                <Link to="/contractor-proposal" state={{ projectData }}>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="px-8 py-3"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Generate RFP Document
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-gray-500">
                Review and modify specifications above before proceeding to package selection
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RFPGeneration;
