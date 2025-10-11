import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";

const UserRegister = () => {
  const navigate = useNavigate();

  const [userFname, setUserFname] = useState("");
  const [userLname, setUserLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!userFname || !userLname || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      // Call your backend API for registration
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userFname,
          userLname,
          email,
          passwordHash: password, // Backend should hash this
        }),
      });

      if (response.ok) {
        toast.success("Registration successful");
        navigate("/login");
      } else {
        const data = await response.json();
        toast.error(data.message || "Registration failed");
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
            <UserPlus className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-4xl text-foreground mb-2">User Registration</h1>
          <p className="text-muted-foreground">Create your account</p>
        </div>

        <div className="bg-card p-8 rounded-lg card-shadow">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="fname">First Name</Label>
              <Input
                id="fname"
                type="text"
                required
                value={userFname}
                onChange={(e) => setUserFname(e.target.value)}
                placeholder="First Name"
              />
            </div>

            <div>
              <Label htmlFor="lname">Last Name</Label>
              <Input
                id="lname"
                type="text"
                required
                value={userLname}
                onChange={(e) => setUserLname(e.target.value)}
                placeholder="Last Name"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="person@example.com"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              Register
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a href="/user/login" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
              ← Back to login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
