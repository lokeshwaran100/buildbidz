
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Home, Send } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  plotArea: z.string().min(1, "Plot area is required"),
  floors: z.string().min(1, "Number of floors is required"),
  budget: z.string().min(1, "Budget range is required"),
  location: z.string().min(1, "Location is required"),
  timeline: z.string().min(1, "Timeline is required"),
  loanRequired: z.string().min(1, "Please specify if loan is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  bidDeadline: z.date({
    required_error: "Bid deadline is required",
  }).refine((date) => {
    const minDate = addDays(new Date(), 6);
    return date >= minDate;
  }, "Bid deadline must be at least 6 days from today"),
  qaDeadline: z.date({
    required_error: "Q&A deadline is required",
  }).refine((date) => {
    const minDate = addDays(new Date(), 2);
    return date >= minDate;
  }, "Q&A deadline must be at least 2 days from today"),
}).refine((data) => {
  return data.qaDeadline < data.bidDeadline;
}, {
  message: "Q&A deadline must be before bid deadline",
  path: ["qaDeadline"],
});

type FormData = z.infer<typeof formSchema>;

const RequestForBid = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      plotArea: "",
      floors: "",
      budget: "",
      location: "",
      timeline: "",
      loanRequired: "",
      description: "",
      contactName: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Request for Bid submitted:", data);
    toast({
      title: "Request for Bid Submitted!",
      description: "Generating your RFP document...",
    });
    
    // Navigate to RFP generation page with project data
    setTimeout(() => {
      navigate("/rfp-generation", { 
        state: { 
          projectData: {
            ...data,
            bidDeadline: format(data.bidDeadline, "PPP"),
            qaDeadline: format(data.qaDeadline, "PPP")
          }
        } 
      });
    }, 1000);
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
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Request for Bid</h2>
            <p className="text-xl text-gray-600">
              Tell us about your construction project and get competitive bids from verified contractors
            </p>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
              <CardTitle className="text-2xl text-center">Project Details Form</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Project Information Section */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="projectName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Modern Family Home" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="plotArea"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Plot Area (sq ft) *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 2500" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="floors"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Floors *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select number of floors" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">1 Floor</SelectItem>
                              <SelectItem value="2">2 Floors</SelectItem>
                              <SelectItem value="3">3 Floors</SelectItem>
                              <SelectItem value="4+">4+ Floors</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget Range *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select budget range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="under-50k">Under $50,000</SelectItem>
                              <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                              <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                              <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                              <SelectItem value="500k-1m">$500,000 - $1,000,000</SelectItem>
                              <SelectItem value="over-1m">Over $1,000,000</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Location *</FormLabel>
                          <FormControl>
                            <Input placeholder="City, State, ZIP" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Timeline to Start *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select timeline" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="immediate">Immediate (Within 1 month)</SelectItem>
                              <SelectItem value="3-months">3 Months</SelectItem>
                              <SelectItem value="6-months">6 Months</SelectItem>
                              <SelectItem value="flexible">Flexible Timeline</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Bid Timeline Section */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Bid Timelines</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="qaDeadline"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Q&A Deadline *</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick Q&A deadline</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < addDays(new Date(), 2)
                                  }
                                  initialFocus
                                  className={cn("p-3 pointer-events-auto")}
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                            <p className="text-xs text-muted-foreground">
                              Minimum 2 days from today
                            </p>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bidDeadline"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Bid Deadline *</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick bid deadline</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < addDays(new Date(), 6)
                                  }
                                  initialFocus
                                  className={cn("p-3 pointer-events-auto")}
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                            <p className="text-xs text-muted-foreground">
                              Minimum 6 days from today
                            </p>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Loan Required Section */}
                  <FormField
                    control={form.control}
                    name="loanRequired"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Loan Required? *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-6"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="loan-yes" />
                              <Label htmlFor="loan-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="loan-no" />
                              <Label htmlFor="loan-no">No</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Project Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Description *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please provide detailed information about your project requirements, specifications, and any special considerations..."
                            className="h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Contact Information */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="contactName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="(555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button 
                      type="submit" 
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                    >
                      <Send className="mr-2 w-5 h-5" />
                      Submit Request for Bid
                    </Button>
                    <p className="text-sm text-gray-500 text-center mt-4">
                      By submitting this form, you agree to be contacted by our team and matched contractors regarding your project
                    </p>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default RequestForBid;
