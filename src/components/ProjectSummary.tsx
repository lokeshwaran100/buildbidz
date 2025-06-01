
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

interface ProjectSummaryProps {
  projectData: ProjectData;
}

const ProjectSummary = ({ projectData }: ProjectSummaryProps) => {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">
          Project Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Project Details</h4>
            <div className="space-y-1 text-gray-700">
              <p><span className="font-medium">Name:</span> {projectData.projectName}</p>
              <p><span className="font-medium">Plot Area:</span> {projectData.plotArea} sq ft</p>
              <p><span className="font-medium">Floors:</span> {projectData.floors}</p>
              <p><span className="font-medium">Budget:</span> {projectData.budget}</p>
              <p><span className="font-medium">Location:</span> {projectData.location}</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Timeline & Contact</h4>
            <div className="space-y-1 text-gray-700">
              <p><span className="font-medium">Start Timeline:</span> {projectData.timeline}</p>
              <p><span className="font-medium">Loan Required:</span> {projectData.loanRequired}</p>
              <p><span className="font-medium">Contact:</span> {projectData.contactName}</p>
              <p><span className="font-medium">Email:</span> {projectData.email}</p>
              <p><span className="font-medium">Phone:</span> {projectData.phone}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectSummary;
