
import { useState, useEffect } from "react";
import { Home, Star, Crown } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BidPackagesHeader from "@/components/BidPackagesHeader";
import PackageCard from "@/components/PackageCard";
import ProjectSummary from "@/components/ProjectSummary";
import NextSteps from "@/components/NextSteps";

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

const BidPackages = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.projectData) {
      setProjectData(location.state.projectData);
    }
  }, [location]);

  const packages = [
    {
      id: "standard",
      name: "Standard Package",
      icon: <Home className="w-8 h-8 text-blue-600" />,
      price: "Base Price",
      description: "Essential construction features for comfortable living",
      features: [
        "Basic architectural design",
        "Standard quality materials",
        "Essential electrical & plumbing",
        "Basic flooring & paint",
        "Standard fixtures",
        "6-month warranty",
        "Basic supervision"
      ],
      color: "border-blue-200 hover:border-blue-400",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      id: "premium",
      name: "Premium Package",
      icon: <Star className="w-8 h-8 text-green-600" />,
      price: "Base Price + 30%",
      description: "Enhanced features with superior quality materials",
      features: [
        "Advanced architectural design",
        "Premium quality materials",
        "Enhanced electrical & plumbing",
        "Premium flooring options",
        "Designer fixtures & fittings",
        "Smart home basic features",
        "1-year warranty",
        "Regular supervision & updates"
      ],
      color: "border-green-200 hover:border-green-400",
      buttonColor: "bg-green-600 hover:bg-green-700",
      popular: true
    },
    {
      id: "luxury",
      name: "Luxury Package",
      icon: <Crown className="w-8 h-8 text-purple-600" />,
      price: "Base Price + 60%",
      description: "Premium construction with luxury finishes and smart features",
      features: [
        "Custom architectural design",
        "Luxury grade materials",
        "Advanced electrical & automation",
        "Premium flooring & finishes",
        "High-end fixtures & appliances",
        "Complete smart home integration",
        "Landscape design included",
        "2-year warranty",
        "Dedicated project manager"
      ],
      color: "border-purple-200 hover:border-purple-400",
      buttonColor: "bg-purple-600 hover:bg-purple-700"
    }
  ];

  const handlePackageSelect = (packageId: string, packageName: string) => {
    setSelectedPackage(packageId);
    toast({
      title: "Package Selected!",
      description: `You have selected the ${packageName}. Our team will prepare detailed proposals and connect you with qualified contractors.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <BidPackagesHeader projectName={projectData?.projectName} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Package Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                id={pkg.id}
                name={pkg.name}
                icon={pkg.icon}
                price={pkg.price}
                description={pkg.description}
                features={pkg.features}
                color={pkg.color}
                buttonColor={pkg.buttonColor}
                popular={pkg.popular}
                isSelected={selectedPackage === pkg.id}
                onSelect={handlePackageSelect}
              />
            ))}
          </div>

          {/* Project Summary */}
          {projectData && <ProjectSummary projectData={projectData} />}

          {selectedPackage && <NextSteps />}
        </div>
      </main>
    </div>
  );
};

export default BidPackages;
