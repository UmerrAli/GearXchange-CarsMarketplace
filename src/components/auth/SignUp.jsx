import { useState } from "react";
import { signUp } from "../../../configs/supabase-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "../../../configs/supabase-config";
import { toast } from "sonner";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { user, error } = await signUp(email, password);
      if (error) throw error;
      toast("Account Created Successfully! Please Sign In");
      if (user) {
        navigate("/sign-in");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    // Google sign up is effectively the same as sign in for OAuth
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background transition-colors duration-300">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-border bg-card p-8 text-card-foreground shadow-2xl sm:p-12">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-foreground">
            Join GearXchange
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Create your account to start listing cars
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive animate-in fade-in slide-in-from-top-1">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleEmailSignUp}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70"
            >
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="rounded-xl bg-background/50 py-6"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              className="rounded-xl bg-background/50 py-6"
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-xl py-6 text-lg shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 active:scale-95"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest">
            <span className="bg-card px-4 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="flex w-full items-center justify-center gap-3 rounded-xl border-border py-6 transition-colors hover:bg-muted/50"
          onClick={handleGoogleSignUp}
        >
          <FcGoogle className="h-6 w-6" />
          <span className="font-semibold">Google Account</span>
        </Button>

        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="font-bold text-primary transition-all hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
