import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ChevronDown, Home, Search, Star, CheckCircle, ArrowRight, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    description: "",
    location: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "Request Submitted!",
      description: "Thank you! We'll contact you within 24 hours to discuss your project.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectType: "",
      description: "",
      location: ""
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const projectTypes = [
    "New Construction",
    "Home Addition",
    "Kitchen Remodel",
    "Bathroom Remodel",
    "Roofing",
    "Flooring",
    "Exterior Work",
    "Other"
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Austin, TX",
      project: "Kitchen Remodel",
      text: "BuildBidz made finding the right contractor so easy! I received 5 competitive bids and saved 20% on my kitchen renovation.",
      rating: 5
    },
    {
      name: "Mike Chen",
      location: "Denver, CO", 
      project: "Home Addition",
      text: "The quality of contractors on this platform is outstanding. Our home addition was completed on time and within budget.",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      location: "Phoenix, AZ",
      project: "Bathroom Remodel",
      text: "From initial bid to project completion, everything was seamless. Highly recommend BuildBidz for any home improvement project.",
      rating: 5
    }
  ];

  const pastProjects = [
    {
      title: "Modern Kitchen Renovation",
      location: "Seattle, WA",
      type: "Kitchen Remodel",
      budget: "$45,000",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
    },
    {
      title: "Two-Story Home Addition",
      location: "Portland, OR", 
      type: "Addition",
      budget: "$125,000",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop"
    },
    {
      title: "Luxury Bathroom Suite",
      location: "San Diego, CA",
      type: "Bathroom Remodel", 
      budget: "$28,000",
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=300&fit=crop"
    },
    {
      title: "Complete Roof Replacement",
      location: "Dallas, TX",
      type: "Roofing",
      budget: "$18,500",
      image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">BuildBidz</h1>
          </div>
          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">How It Works</a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Testimonials</a>
            <a href="#projects" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Projects</a>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" className="text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:scale-105">
                <LogIn className="w-4 h-4 mr-2" />
                Customer Login
              </Button>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:scale-105">
                Contractor Login
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen bg-cover bg-center bg-no-repeat" 
               style={{ backgroundImage: "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&h=1080&fit=crop')" }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-transparent"></div>
        
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div className="text-white">
              <div className="animate-fade-in">
                <h2 className="text-6xl font-bold mb-6 leading-tight">
                  Build Your Dream Home with
                  <span className="text-orange-400 block"> Top-Rated Contractors</span>
                </h2>
                <p className="text-xl mb-8 leading-relaxed text-blue-100">
                  Connect with verified builders through competitive bidding. Save time, money, and ensure quality workmanship for your construction project.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 mb-12">
                  <div className="flex items-center space-x-3 group">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-medium">Verified Contractors</span>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-medium">Competitive Pricing</span>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-medium">Quality Guarantee</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/request-for-bid">
                    <Button 
                      size="lg" 
                      className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                    >
                      Start Your Project
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
                    onClick={() => document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Right Side - Quick Quote Form */}
            <div className="lg:flex justify-end">
              <Card id="quote-form" className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 p-2 w-full max-w-md animate-scale-in hover:shadow-3xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center mb-4">
                      <Star className="w-8 h-8 text-orange-500 fill-current" />
                      <Star className="w-8 h-8 text-orange-500 fill-current" />
                      <Star className="w-8 h-8 text-orange-500 fill-current" />
                      <Star className="w-8 h-8 text-orange-500 fill-current" />
                      <Star className="w-8 h-8 text-orange-500 fill-current" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Your Free Quotes</h3>
                    <p className="text-gray-600">Tell us about your project and receive competitive bids from local contractors</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Smith"
                          required
                          className="border-gray-300 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 group-hover:border-blue-400"
                        />
                      </div>
                      <div className="group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(555) 123-4567"
                          required
                          className="border-gray-300 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 group-hover:border-blue-400"
                        />
                      </div>
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        required
                        className="border-gray-300 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 group-hover:border-blue-400"
                      />
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Project Location *</label>
                      <Input
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="City, State"
                        required
                        className="border-gray-300 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 group-hover:border-blue-400"
                      />
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Project Type *</label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 group-hover:border-blue-400"
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Project Description *</label>
                      <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Please describe your project in detail..."
                        required
                        className="border-gray-300 h-24 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 group-hover:border-blue-400"
                      />
                    </div>
                    
                    <Link to="/request-for-bid" className="block">
                      <Button 
                        type="button"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                      >
                        Get Free Quotes Now
                        <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                    
                    <p className="text-xs text-gray-500 text-center">
                      Click above to fill detailed project information for accurate quotes
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How BuildBidz Works</h2>
            <p className="text-xl text-gray-600">Simple, transparent, and efficient bidding process</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Submit Your Project</h3>
              <p className="text-gray-600">Tell us about your construction or renovation project with details and requirements</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Matched</h3>
              <p className="text-gray-600">We connect you with pre-screened, qualified contractors in your area</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Compare Bids</h3>
              <p className="text-gray-600">Receive multiple competitive quotes and compare pricing, timelines, and services</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose & Build</h3>
              <p className="text-gray-600">Select the best contractor for your project and start building your dream</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Thousands of successful projects completed</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                    <Badge variant="secondary" className="mt-2 bg-blue-100 text-blue-800">
                      {testimonial.project}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recent Success Stories</h2>
            <p className="text-xl text-gray-600">See what's possible when you connect with the right contractor</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pastProjects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2 text-xs">
                    {project.type}
                  </Badge>
                  <h3 className="font-semibold text-gray-900 mb-1">{project.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{project.location}</p>
                  <p className="text-sm font-medium text-green-600">{project.budget}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 text-blue-100">Join thousands of satisfied homeowners who found their perfect contractor through BuildBidz</p>
          <Link to="/request-for-bid">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
            >
              Get Your Free Quotes Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Home className="h-6 w-6 text-blue-400" />
                <h3 className="text-xl font-bold">BuildBidz</h3>
              </div>
              <p className="text-gray-400">Connecting homeowners with trusted builders through competitive bidding.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Homeowners</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cost Guides</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Contractors</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Join Network</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contractor Login</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BuildBidz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
