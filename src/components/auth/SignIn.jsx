import { useState } from "react";
import { signIn } from "../../../configs/supabase-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "../../../configs/supabase-config";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const { user, error } = await signIn(email, password);
            if (error) throw error;
            if (user) {
                navigate("/"); // Redirect to home or previous page
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
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
        <div className="flex items-center justify-center min-h-screen bg-background transition-colors duration-300">
            <div className="w-full max-w-md p-8 sm:p-12 space-y-8 bg-card text-card-foreground rounded-3xl shadow-2xl border border-border">
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold text-foreground tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="mt-3 text-sm text-muted-foreground">
                        Sign in to your GearXchange account
                    </p>
                </div>

                {error && (
                    <div className="p-4 text-sm text-destructive bg-destructive/10 rounded-xl border border-destructive/20 animate-in fade-in slide-in-from-top-1">
                        {error}
                    </div>
                )}

                <form className="space-y-5" onSubmit={handleEmailLogin}>
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
                            className="bg-background/50 py-6 rounded-xl"
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
                            placeholder="••••••••"
                            className="bg-background/50 py-6 rounded-xl"
                        />
                    </div>

                    <Button type="submit" className="w-full py-6 text-lg rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>

                <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase tracking-widest">
                        <span className="px-4 bg-card text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>

                <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-3 py-6 rounded-xl border-border hover:bg-muted/50 transition-colors"
                    onClick={handleGoogleLogin}
                >
                    <FcGoogle className="h-6 w-6" />
                    <span className="font-semibold">Google Account</span>
                </Button>

                <div className="text-center mt-8 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link to="/sign-up" className="text-primary font-bold hover:underline transition-all">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
