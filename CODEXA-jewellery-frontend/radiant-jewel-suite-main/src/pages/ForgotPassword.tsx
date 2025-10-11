import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      // Call backend API for forgot password
      const response = await fetch("http://localhost:8080/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success("Password reset instructions sent!");
        navigate("/user/login"); // Redirect to login page
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to request password reset");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <Lock className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-4xl text-foreground mb-2">Forgot Password</h1>
          <p className="text-muted-foreground">Enter your email to reset your password</p>
        </div>

        <div className="bg-card p-8 rounded-lg card-shadow">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="person@example.com"
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              Send Reset Link
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/user/login"
              className="text-sm text-muted-foreground hover:text-primary transition-smooth"
            >
              ← Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
