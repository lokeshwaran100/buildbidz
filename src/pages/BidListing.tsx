
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Home, ArrowLeft, Star, Award, Briefcase, CheckCircle, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BidData {
  id: string;
  bidderName: string;
  bidValue: number;
  contractorScore: number;
  ratings: number;
  pastProjects: number;
  experience: number;
  submittedAt: string;
  isSelected: boolean;
}

// Mock data for bids - sorted by lowest bid first
const mockBids: BidData[] = [
  {
    id: "1",
    bidderName: "Bidder 1",
    bidValue: 4250000,
    contractorScore: 92,
    ratings: 4.8,
    pastProjects: 15,
    experience: 8,
    submittedAt: "2024-06-20T10:30:00Z",
    isSelected: false
  },
  {
    id: "2",
    bidderName: "Bidder 2",
    bidValue: 4380000,
    contractorScore: 88,
    ratings: 4.6,
    pastProjects: 12,
    experience: 6,
    submittedAt: "2024-06-19T14:15:00Z",
    isSelected: false
  },
  {
    id: "3",
    bidderName: "Bidder 3",
    bidValue: 4420000,
    contractorScore: 85,
    ratings: 4.4,
    pastProjects: 10,
    experience: 5,
    submittedAt: "2024-06-18T16:45:00Z",
    isSelected: false
  },
  {
    id: "4",
    bidderName: "Bidder 4",
    bidValue: 4650000,
    contractorScore: 90,
    ratings: 4.7,
    pastProjects: 18,
    experience: 10,
    submittedAt: "2024-06-17T09:20:00Z",
    isSelected: false
  },
  {
    id: "5",
    bidderName: "Bidder 5",
    bidValue: 4780000,
    contractorScore: 83,
    ratings: 4.2,
    pastProjects: 8,
    experience: 4,
    submittedAt: "2024-06-16T11:10:00Z",
    isSelected: false
  }
];

const projectInfo = {
  projectName: "Modern Villa Construction",
  location: "Bangalore, Karnataka",
  totalBids: 5,
  deadline: "2024-07-15"
};

const BidListing = () => {
  const [bids, setBids] = useState<BidData[]>(mockBids);
  const [showShortlisted, setShowShortlisted] = useState(false);
  const { toast } = useToast();

  const handleSelectBidder = (bidderId: string, isSelected: boolean) => {
    setBids(bids.map(bid => 
      bid.id === bidderId ? { ...bid, isSelected } : bid
    ));
  };

  const handleConfirmShortlist = () => {
    const selectedBidders = bids.filter(bid => bid.isSelected);
    
    if (selectedBidders.length === 0) {
      toast({
        title: "No Bidders Selected",
        description: "Please select at least one bidder to shortlist.",
        variant: "destructive"
      });
      return;
    }

    setShowShortlisted(true);
    toast({
      title: "Bidders Shortlisted Successfully!",
      description: `${selectedBidders.length} bidder(s) have been notified about their shortlisting.`
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreDescription = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Good";
    return "Average";
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? "fill-yellow-400 text-yellow-400" 
            : i < rating 
            ? "fill-yellow-200 text-yellow-400" 
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Background for shortlisting */}
      {showShortlisted && (
        <div 
          className="fixed inset-0 z-0 opacity-20"
          style={{
            backgroundImage: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><text y=\".9em\" font-size=\"90\">🎉</text></svg>')",
            backgroundSize: "100px 100px",
            backgroundRepeat: "repeat"
          }}
        />
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b relative z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">BuildBidz</h1>
          </div>
          <Link to="/rfb-listing">
            <Button variant="ghost" className="text-blue-600 hover:bg-blue-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to RFB Listing
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Bids Received
          </h2>
          <div className="text-xl text-gray-600 space-y-2">
            <p>Project: <span className="font-semibold">{projectInfo.projectName}</span></p>
            <p>Location: <span className="font-semibold">{projectInfo.location}</span></p>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                {projectInfo.totalBids} Bids Received
              </Badge>
              <Badge className="bg-green-100 text-green-800 px-4 py-2">
                Deadline: {projectInfo.deadline}
              </Badge>
            </div>
          </div>
        </div>

        {/* Bids Table */}
        <Card className="bg-white shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
              <Award className="w-6 h-6 mr-3 text-blue-600" />
              Contractor Bids Analysis
            </CardTitle>
            <p className="text-gray-600">Bidders are ranked by lowest bid amount</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Select</TableHead>
                    <TableHead>Bidder</TableHead>
                    <TableHead>Bid Value (₹)</TableHead>
                    <TableHead>BuildBidz Score</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Past Projects</TableHead>
                    <TableHead>Experience (Years)</TableHead>
                    <TableHead>Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bids.map((bid, index) => (
                    <TableRow key={bid.id} className={bid.isSelected ? "bg-blue-50" : ""}>
                      <TableCell>
                        <Checkbox
                          checked={bid.isSelected}
                          onCheckedChange={(checked) => 
                            handleSelectBidder(bid.id, checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Badge variant={index === 0 ? "default" : "secondary"}>
                            {index === 0 ? "Lowest" : `#${index + 1}`}
                          </Badge>
                          <span className="font-medium">{bid.bidderName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-green-600">
                          ₹{bid.bidValue.toLocaleString()}
                        </span>
                        <p className="text-xs text-gray-500">(excl. taxes)</p>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <span className={`font-bold text-lg ${getScoreColor(bid.contractorScore)}`}>
                              {bid.contractorScore}
                            </span>
                            <span className="text-sm text-gray-600">
                              {getScoreDescription(bid.contractorScore)}
                            </span>
                          </div>
                          <Progress 
                            value={bid.contractorScore} 
                            className="w-24 h-2"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            {renderStars(bid.ratings)}
                          </div>
                          <span className="font-medium">{bid.ratings}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Briefcase className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">{bid.pastProjects}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{bid.experience} years</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {new Date(bid.submittedAt).toLocaleDateString()}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button
            onClick={handleConfirmShortlist}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8"
            disabled={bids.filter(bid => bid.isSelected).length === 0}
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Confirm Shortlist ({bids.filter(bid => bid.isSelected).length})
          </Button>
        </div>

        {/* Shortlisted Summary */}
        {showShortlisted && (
          <Card className="mt-8 bg-green-50 border-green-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-green-800 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                Shortlisted Bidders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bids.filter(bid => bid.isSelected).map((bid) => (
                  <div key={bid.id} className="flex justify-between items-center bg-white p-4 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <Badge className="bg-green-600 text-white">{bid.bidderName}</Badge>
                      <span className="font-semibold">₹{bid.bidValue.toLocaleString()}</span>
                      <span className="text-sm text-gray-600">Score: {bid.contractorScore}</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Notified</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default BidListing;
