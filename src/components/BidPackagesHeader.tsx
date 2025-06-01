
import { Home, ArrowLeft, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface BidPackagesHeaderProps {
  projectName?: string;
}

const BidPackagesHeader = ({ projectName }: BidPackagesHeaderProps) => {
  return (
    <>
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

      {/* Title Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Construction Package
        </h2>
        {projectName && (
          <p className="text-xl text-gray-600 mb-2">
            For: <span className="font-semibold">{projectName}</span>
          </p>
        )}
        <p className="text-lg text-gray-600 mb-4">
          Select the package that best fits your project requirements and budget
        </p>
        <Link to="/package-details">
          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
            <Info className="w-4 h-4 mr-2" />
            View Detailed Package Information
          </Button>
        </Link>
      </div>
    </>
  );
};

export default BidPackagesHeader;
