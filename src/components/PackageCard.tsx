
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { ReactNode } from "react";

interface PackageCardProps {
  id: string;
  name: string;
  icon: ReactNode;
  price: string;
  description: string;
  features: string[];
  color: string;
  buttonColor: string;
  popular?: boolean;
  isSelected: boolean;
  onSelect: (id: string, name: string) => void;
}

const PackageCard = ({
  id,
  name,
  icon,
  price,
  description,
  features,
  color,
  buttonColor,
  popular,
  isSelected,
  onSelect
}: PackageCardProps) => {
  return (
    <Card 
      className={`relative transition-all duration-300 hover:shadow-xl ${color} ${
        isSelected ? 'ring-2 ring-blue-500 scale-105' : ''
      }`}
    >
      {popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white">
          Most Popular
        </Badge>
      )}
      
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          {icon}
        </div>
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
        <p className="text-3xl font-bold text-gray-900 mt-2">{price}</p>
        <p className="text-gray-600 mt-2">{description}</p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        <Button 
          onClick={() => onSelect(id, name)}
          className={`w-full ${buttonColor} text-white py-3 text-lg font-semibold transition-all duration-300 hover:scale-105`}
          disabled={isSelected}
        >
          {isSelected ? 'Selected' : 'Select Package'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PackageCard;
