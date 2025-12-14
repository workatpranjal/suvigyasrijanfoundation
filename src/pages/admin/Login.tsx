import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // Check current auth state on mount
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await auth.getUser();
      setUser(user);
      setAuthLoading(false);
    };

    checkAuth();

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user && !authLoading) {
      navigate("/admin/dashboard");
    }
  }, [user, authLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("Login successful");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Invalid email or password";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 flex items-center justify-center">
            <img
              src="/Logo.png"
              alt="Suvigya Srijan Foundation"
              className="h-16 w-16"
            />
          </div>
          <div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md">
                <p className="text-sm text-destructive font-medium">{error}</p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="min-h-[44px]"
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="min-h-[44px]"
                autoComplete="current-password"
              />
            </div>
            <Button
              type="submit"
              className="w-full min-h-[44px]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => navigate("/")}
              className="text-sm text-muted-foreground"
            >
              ← Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
