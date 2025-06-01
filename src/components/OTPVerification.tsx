
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Shield, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OTPVerificationProps {
  onVerify: () => void;
  onCancel: () => void;
  contractorEmail: string;
}

const OTPVerification = ({ onVerify, onCancel, contractorEmail }: OTPVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const { toast } = useToast();

  // Simulate OTP generation
  const generatedOTP = "123456"; // In real app, this would be sent via SMS/Email

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit OTP.",
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);

    // Simulate API call
    setTimeout(() => {
      if (otp === generatedOTP) {
        toast({
          title: "OTP Verified Successfully!",
          description: "Your bid will be submitted now."
        });
        onVerify();
      } else {
        toast({
          title: "Invalid OTP",
          description: "Please check the OTP and try again.",
          variant: "destructive"
        });
      }
      setIsVerifying(false);
    }, 1000);
  };

  const resendOTP = () => {
    setOtp("");
    setTimeLeft(300);
    toast({
      title: "OTP Resent",
      description: `New OTP sent to ${contractorEmail}`
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center text-xl">
            <Shield className="w-6 h-6 mr-2 text-green-600" />
            OTP Verification
          </CardTitle>
          <p className="text-gray-600 text-sm">
            Enter the 6-digit OTP sent to your email: {contractorEmail}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center text-sm text-gray-600 mb-2">
              <Clock className="w-4 h-4 mr-1" />
              Time remaining: {formatTime(timeLeft)}
            </div>
            {timeLeft === 0 ? (
              <Button variant="link" onClick={resendOTP} className="text-blue-600">
                Resend OTP
              </Button>
            ) : (
              <Button variant="link" onClick={resendOTP} className="text-blue-600">
                Didn't receive? Resend
              </Button>
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              <strong>Demo OTP:</strong> 123456 (For testing purposes)
            </p>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1"
              disabled={isVerifying}
            >
              Cancel
            </Button>
            <Button
              onClick={handleVerifyOTP}
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={otp.length !== 6 || isVerifying}
            >
              {isVerifying ? "Verifying..." : "Verify & Submit"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OTPVerification;
