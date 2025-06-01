
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Crown, Home, ArrowLeft, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const PackageDetails = () => {
  const packages = [
    {
      id: "standard",
      name: "Standard Package",
      icon: <Home className="w-8 h-8 text-blue-600" />,
      price: "Base Price",
      description: "Essential construction features for comfortable living",
      color: "border-blue-200",
      headerColor: "bg-blue-50",
      items: {
        "Structural Work": [
          "Foundation - RCC footing and plinth beam",
          "Walls - 6 inch brick masonry with cement mortar",
          "Roof - RCC slab with standard reinforcement",
          "Columns and beams - Standard RCC work",
          "Basic waterproofing for terrace"
        ],
        "Electrical Work": [
          "Basic wiring with PVC conduits",
          "Standard switches and sockets (Anchor/Havells)",
          "LED lights and fans points",
          "Single phase electrical connection provision",
          "Basic distribution board",
          "Earthing and safety measures"
        ],
        "Plumbing Work": [
          "Basic plumbing with CPVC pipes",
          "Standard bathroom fittings",
          "Kitchen sink and tap provision",
          "Water tank connection (overhead)",
          "Basic drainage system",
          "Boring/borewell connection provision"
        ],
        "Flooring & Finishing": [
          "Vitrified tiles (₹40-60/sq ft) for all rooms",
          "Ceramic tiles for bathrooms and kitchen",
          "Basic cement plastering",
          "Distemper paint for walls",
          "Enamel paint for doors and windows"
        ],
        "Doors & Windows": [
          "Sal wood frame with flush doors",
          "Standard aluminum sliding windows",
          "Basic hardware and fittings",
          "Grills for ground floor windows"
        ],
        "Kitchen": [
          "Basic kitchen platform with granite top",
          "Standard wall tiles (up to 2 feet height)",
          "Single bowl SS sink",
          "Provision for gas connection"
        ],
        "Bathroom": [
          "Standard ceramic wall tiles",
          "Basic sanitary ware (Indian WC, washbasin)",
          "Standard CP fittings",
          "Exhaust fan provision"
        ]
      },
      warranty: "6 months structural warranty",
      supervision: "Weekly site visits and progress updates"
    },
    {
      id: "premium",
      name: "Premium Package",
      icon: <Star className="w-8 h-8 text-green-600" />,
      price: "Base Price + 30%",
      description: "Enhanced features with superior quality materials",
      color: "border-green-200",
      headerColor: "bg-green-50",
      popular: true,
      items: {
        "Structural Work": [
          "Enhanced foundation with waterproofing",
          "8 inch brick masonry with cement mortar",
          "RCC slab with enhanced reinforcement",
          "Decorative columns and architectural elements",
          "Premium waterproofing with membrane"
        ],
        "Electrical Work": [
          "Concealed wiring with ISI mark cables",
          "Premium switches and sockets (Legrand/Schneider)",
          "LED lights, fans, and decorative lighting points",
          "Three phase electrical connection provision",
          "MCB distribution board with protection",
          "Inverter and battery backup provision"
        ],
        "Plumbing Work": [
          "Premium CPVC/PPR pipes with insulation",
          "Designer bathroom fittings",
          "Granite sink for kitchen with premium tap",
          "Overhead and underground water tanks",
          "Sewage treatment plant provision",
          "Hot water connection to all bathrooms"
        ],
        "Flooring & Finishing": [
          "Premium vitrified tiles (₹80-120/sq ft)",
          "Designer tiles for bathrooms and kitchen",
          "Smooth finish plastering (POP)",
          "Premium emulsion paint for walls",
          "PU polish for doors and wooden work"
        ],
        "Doors & Windows": [
          "Teak wood frame with designer doors",
          "UPVC/Aluminum windows with mosquito mesh",
          "Premium hardware and locks",
          "Decorative grills and safety features"
        ],
        "Kitchen": [
          "L-shaped modular kitchen with premium finish",
          "Designer wall tiles (full height)",
          "Double bowl SS sink with water purifier point",
          "Chimney and hob provision",
          "Storage cabinets and drawers"
        ],
        "Bathroom": [
          "Premium wall and floor tiles",
          "Designer sanitary ware (Western WC, pedestal basin)",
          "Premium CP fittings with hot/cold mixer",
          "Exhaust fan and ventilation",
          "Mirror and bathroom accessories"
        ],
        "Additional Features": [
          "False ceiling in living and master bedroom",
          "TV unit and wardrobe in master bedroom",
          "Intercom system provision",
          "Garden landscaping (basic)",
          "Compound wall with gate"
        ]
      },
      warranty: "1 year comprehensive warranty",
      supervision: "Dedicated supervisor with daily updates"
    },
    {
      id: "luxury",
      name: "Luxury Package",
      icon: <Crown className="w-8 h-8 text-purple-600" />,
      price: "Base Price + 60%",
      description: "Premium construction with luxury finishes and smart features",
      color: "border-purple-200",
      headerColor: "bg-purple-50",
      items: {
        "Structural Work": [
          "Luxury foundation with advanced waterproofing",
          "10 inch brick masonry with weather-resistant mortar",
          "Enhanced RCC work with superior grade concrete",
          "Architectural features and decorative elements",
          "Advanced terrace waterproofing with garden provision"
        ],
        "Smart Electrical Work": [
          "Home automation ready wiring",
          "Premium brand switches and sockets (Legrand/ABB)",
          "Designer lighting with dimmer controls",
          "Solar panel provision and connection",
          "Smart distribution board with monitoring",
          "Backup power solutions (generator/inverter)",
          "CCTV and security system wiring"
        ],
        "Advanced Plumbing": [
          "Premium PPR pipes with lifetime warranty",
          "Luxury bathroom fittings (Kohler/American Standard)",
          "Quartz/Granite kitchen sink with premium faucets",
          "Rainwater harvesting system",
          "Advanced sewage treatment and recycling",
          "Jacuzzi and steam room provision",
          "Central hot water system"
        ],
        "Premium Flooring & Finishing": [
          "Imported/Premium marble/tiles (₹150+ per sq ft)",
          "Luxury bathroom tiles with designer patterns",
          "Premium wall finishes (texture/wallpaper options)",
          "Designer paints with special effects",
          "High-end wood polish and finishes"
        ],
        "Designer Doors & Windows": [
          "Premium hardwood/engineered wood doors",
          "German/European standard windows",
          "Luxury hardware and security systems",
          "Automated gates and security features"
        ],
        "Luxury Kitchen": [
          "Full modular kitchen with island/breakfast counter",
          "Premium appliances provision (built-in oven, microwave)",
          "Quartz countertops with designer backsplash",
          "Wine storage and bar counter",
          "Advanced storage solutions and organizers"
        ],
        "Spa-like Bathrooms": [
          "Luxury wall and floor treatments",
          "Premium sanitary ware with smart features",
          "Rain shower, hand shower, and body jets",
          "Luxury mirrors and lighting",
          "Heated floors and towel warmers"
        ],
        "Smart Home Features": [
          "Complete home automation system",
          "Climate control (central AC provision)",
          "Smart security with app control",
          "Entertainment system wiring",
          "Smart lighting and ambiance control"
        ],
        "Landscape & Exteriors": [
          "Professional landscape design and execution",
          "Swimming pool provision",
          "Outdoor kitchen/BBQ area",
          "Decorative compound wall with automated gates",
          "Garden irrigation system"
        ]
      },
      warranty: "2 years comprehensive warranty with annual maintenance",
      supervision: "Dedicated project manager with real-time progress tracking"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">BuildBidz</h1>
          </div>
          <Link to="/bid-packages">
            <Button variant="ghost" className="text-blue-600 hover:bg-blue-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Packages
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Detailed Package Information
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive breakdown of what's included in each construction package
            </p>
          </div>

          {/* Important Notice */}
          <div className="mb-8">
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-orange-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-2">Important Note</h3>
                    <p className="text-orange-800">
                      <strong>Government Approvals:</strong> All government approvals, permits, and regulatory clearances 
                      (including building permits, NOCs, completion certificates, etc.) are the responsibility of the customer. 
                      We can assist with documentation and liaison work at additional cost.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Package Details */}
          <div className="space-y-12">
            {packages.map((pkg) => (
              <Card key={pkg.id} className={`${pkg.color} shadow-lg`}>
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className={`${pkg.headerColor} border-b`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {pkg.icon}
                      <div>
                        <CardTitle className="text-3xl font-bold">{pkg.name}</CardTitle>
                        <p className="text-xl font-semibold text-gray-700 mt-1">{pkg.price}</p>
                        <p className="text-gray-600 mt-2">{pkg.description}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {Object.entries(pkg.items).map(([category, items]) => (
                      <div key={category} className="space-y-4">
                        <h4 className="text-xl font-bold text-gray-900 border-b pb-2">
                          {category}
                        </h4>
                        <div className="space-y-2">
                          {items.map((item, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Warranty & Support</h5>
                        <p className="text-gray-700">{pkg.warranty}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Project Supervision</h5>
                        <p className="text-gray-700">{pkg.supervision}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <Link to="/bid-packages">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                        Choose This Package
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Information */}
          <div className="mt-12">
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  What's Not Included (Customer Responsibility)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Government & Legal</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Building plan approval</li>
                      <li>• RERA registration</li>
                      <li>• Environmental clearances</li>
                      <li>• Property tax payments</li>
                      <li>• Legal documentation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">External Connections</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Electricity board connection charges</li>
                      <li>• Water board connection</li>
                      <li>• Sewage connection charges</li>
                      <li>• Internet/cable connections</li>
                      <li>• Gas pipeline connection</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PackageDetails;
