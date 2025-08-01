import { useState } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField } from "@/components/ui/FormField";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, Zap } from "lucide-react";
import { useNotification } from "@/components/ui/notification";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { login } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent rapid successive attempts
    if (isLoading) return;
    
    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        setRetryCount(0); // Reset retry count on success
        showNotification('success', "Login successful!");
        navigate("/dashboard");
      } else {
        // Handle rate limiting
        if (result.error?.includes('Too many login attempts')) {
          showNotification('error', result.error);
          setRetryCount(prev => prev + 1);
        } else {
          showNotification('error', result.error || "Invalid email or password");
          setRetryCount(prev => prev + 1);
        }
      }
    } catch (error) {
      showNotification('error', "Login failed. Please try again.");
      setRetryCount(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role: 'admin' | 'user' | 'store_owner') => {
    // Prevent demo login if too many retries
    if (retryCount >= 3) {
      showNotification('error', "Too many login attempts. Please wait a few minutes.");
      return;
    }
    
    const demoCredentials = {
      admin: { email: 'admin@system.com', password: 'Admin123!' },
      user: { email: 'john@example.com', password: 'User123!' },
      store_owner: { email: 'owner@techstore.com', password: 'Store123!' }
    };
    
    setEmail(demoCredentials[role].email);
    setPassword(demoCredentials[role].password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Back to Landing Page */}
        <div className="mb-8">
                      <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-slate-600 hover:text-slate-900 transition-colors rounded-full"
            >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Main Login Card */}
        <Card className="card p-8">
          <CardHeader className="text-center pb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-slate-900">Welcome Back</CardTitle>
            <CardDescription className="text-slate-600 mt-3 text-lg">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormField
                label="Email"
                id="email"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="Enter your email"
                required
              />
              
              <FormField
                label="Password"
                id="password"
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="Enter your password"
                required
              />

              <Button
                type="submit"
                className="w-full bg-slate-900 text-white font-semibold rounded-2xl py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                disabled={isLoading || retryCount >= 3}
              >
                {isLoading ? "Signing in..." : retryCount >= 3 ? "Too Many Attempts" : "Sign In"}
              </Button>
              
              {retryCount >= 3 && (
                <div className="text-center text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                  Too many login attempts. Please wait a few minutes before trying again.
                </div>
              )}
            </form>

            {/* Sign Up Link */}
            <div className="text-center pt-6">
              <p className="text-slate-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-purple-600 font-bold hover:underline transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-8 text-sm text-slate-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Secure Login</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};