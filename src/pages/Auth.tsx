import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import { Bike, Mail, Shield } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  const extractCooldownSeconds = (message?: string) => {
    if (!message) return null;
    const match = message.match(/after\s+(\d+)\s+seconds?/i);
    if (!match?.[1]) return null;
    const seconds = Number(match[1]);
    return Number.isFinite(seconds) && seconds > 0 ? seconds : null;
  };

  const handleOtpRateLimit = (message?: string) => {
    const seconds = extractCooldownSeconds(message);
    if (!seconds) return false;
    setCooldownSeconds(seconds);
    toast.error(`Please wait ${seconds}s before requesting another code.`);
    return true;
  };

  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const t = window.setInterval(() => {
      setCooldownSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => window.clearInterval(t);
  }, [cooldownSeconds]);

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/members");
      }
    };
    checkUser();
  }, [navigate]);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cooldownSeconds > 0) {
      toast.error(`Please wait ${cooldownSeconds}s before requesting another code.`);
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        }
      });

      if (error) {
        if (!handleOtpRateLimit(error.message)) {
          toast.error(error.message);
        }
        return;
      }

      setOtpSent(true);
      toast.success("Check your email for the verification code!");
    } catch (error: any) {
      console.error("Send OTP error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: otp.trim(),
        type: 'email'
      });

      if (error) {
        toast.error("Invalid or expired code. Please try again.");
        return;
      }

      if (data.session) {
        toast.success("Welcome back!");
        navigate("/members");
      }
    } catch (error: any) {
      console.error("Verify OTP error:", error);
      toast.error("An error occurred during verification. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (cooldownSeconds > 0) {
      toast.error(`Please wait ${cooldownSeconds}s before requesting another code.`);
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        }
      });

      if (error) {
        if (!handleOtpRateLimit(error.message)) {
          toast.error(error.message);
        }
        return;
      }

      toast.success("New code sent to your email!");
    } catch (error: any) {
      console.error("Resend OTP error:", error);
      toast.error("Failed to resend code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Bike className="h-16 w-16 text-primary" />
                <Shield className="h-6 w-6 text-primary absolute -bottom-1 -right-1 bg-background rounded-full p-1" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Member Login</h1>
            <p className="text-muted-foreground">
              {otpSent ? "Enter the code from your email" : "Sign in with a verification code"}
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6 shadow-lg">
            {!otpSent ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    We'll send you a secure code to verify your identity
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    If you don't receive it within 1–2 minutes, check your spam/junk folder.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || cooldownSeconds > 0}
                >
                  {isLoading
                    ? "Sending code..."
                    : cooldownSeconds > 0
                      ? `Try again in ${cooldownSeconds}s`
                      : "Send Verification Code"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div>
                  <Label htmlFor="otp">Enter code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    required
                    disabled={isLoading}
                    className="text-center text-2xl tracking-widest font-mono"
                    maxLength={6}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Check your email for the verification code
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? "Verifying..." : "Verify & Sign In"}
                </Button>

                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleResendCode}
                    disabled={isLoading || cooldownSeconds > 0}
                  >
                    {cooldownSeconds > 0 ? `Resend in ${cooldownSeconds}s` : "Resend Code"}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => {
                      setOtpSent(false);
                      setOtp("");
                    }}
                    disabled={isLoading}
                  >
                    Change Email
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-6 pt-6 border-t text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Don't have an account?
              </p>
              <Button
                variant="outline"
                onClick={() => navigate("/join")}
                disabled={isLoading}
              >
                Join Our Group
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            <Shield className="h-4 w-4 inline mr-1" />
            Secure passwordless authentication
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
