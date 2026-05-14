import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { adminLogin } from "../auth";
import { toast } from "@/hooks/use-toast";
import { ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("admin@natures.way");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const session = adminLogin(email, password);
      setLoading(false);
      if (session) {
        toast({ title: "Welcome back", description: "Signed in as admin." });
        navigate("/admin");
      } else {
        toast({ title: "Invalid credentials", description: "Check email and password.", variant: "destructive" });
      }
    }, 400);
  };

  return (
    <div className="admin-theme">
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-sm">
          <CardHeader className="space-y-3">
            <div className="h-10 w-10 rounded-md bg-primary text-primary-foreground grid place-items-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl">Admin Console</CardTitle>
              <CardDescription>Sign in to manage Nature's Way operations.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in…" : "Sign in"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Demo credentials prefilled. UI prototype — no real backend.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
