
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NextSteps = () => {
  return (
    <div className="text-center mt-8">
      <p className="text-lg text-gray-600 mb-4">
        Next Steps: Our team will prepare detailed proposals and connect you with qualified contractors within 24 hours.
      </p>
      <Link to="/">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
          Return to Home
        </Button>
      </Link>
    </div>
  );
};

export default NextSteps;
