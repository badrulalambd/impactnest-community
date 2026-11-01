
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import {
  LuArrowRight,
  LuEye,
  LuEyeOff,
  LuLock,
  LuMail,
} from "react-icons/lu";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const inputClassName =
  "w-full rounded-lg border border-border bg-muted/40 py-2.5 pl-11 pr-11 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus-visible:border-brand-orange focus-visible:ring-2 focus-visible:ring-brand-orange/30";

const FieldIcon = ({
  icon: Icon,
}: {
  icon: React.ComponentType<{ className?: string }>;
}) => (
  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
    <Icon className="size-4" />
  </span>
);


const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Email and password login
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(
          error.message ||
            "Invalid email or password. Please try again."
        );
        return;
      }

      if (data) {
        // Show success before navigating.
        toast.success("Login successful!");

        router.push("/");
        router.refresh();
      } else {
        toast.error("Unable to log in. Please try again.");
      }
    } catch (error) {
      console.error("Email login error:", error);

      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Google OAuth login
  const handleGoogleLogin = async () => {
    if (isGoogleLoading) return;

    setIsGoogleLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/?auth=google-success",
      });

      if (error) {
        toast.error(
          error.message || "Unable to sign in with Google."
        );
        setIsGoogleLoading(false);
      }

      // Do not show success here.
      // Google authentication completes after the redirect.
    } catch (error) {
      console.error("Google login error:", error);

      toast.error(
        "Unable to connect to Google. Please try again."
      );

      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-muted/30 px-4 pb-8">
      <div className="w-full max-w-md rounded-2xl border border-border/60 bg-card p-8 shadow-[0_12px_40px_-12px_rgba(7,55,99,0.18)]">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/fav.png"
            width={120}
            height={120}
            alt="ImpactNest Community logo"
            priority
          />

          <h1 className="text-2xl font-bold text-brand-navy dark:text-foreground">
            Continue Your Impact
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to connect, collaborate, and make an impact.
          </p>
        </div>

        {/* Email login form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-foreground"
            >
              Email Address
            </label>

            <div className="relative">
              <FieldIcon icon={LuMail} />

              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                required
                placeholder="name@example.com"
                className={inputClassName}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-foreground"
            >
              Password
            </label>

            <div className="relative">
              <FieldIcon icon={LuLock} />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className={inputClassName}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <button
                type="button"
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute inset-y-0 right-3 flex items-center text-muted-foreground transition-colors hover:text-foreground"
              >
                {showPassword ? (
                  <LuEyeOff className="size-4" />
                ) : (
                  <LuEye className="size-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || isGoogleLoading}
            className="h-11 w-full bg-brand-navy font-semibold text-white hover:bg-brand-navy/90 disabled:opacity-60 dark:bg-brand-orange dark:hover:bg-brand-orange/90"
          >
            {isLoading ? "Signing in..." : "Login"}

            {!isLoading && <LuArrowRight className="size-4" />}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">
            OR CONTINUE WITH
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Google login */}
        <Button
          type="button"
          variant="outline"
          disabled={isGoogleLoading || isLoading}
          onClick={handleGoogleLogin}
          className="h-11 w-full"
        >
          {isGoogleLoading ? (
            "Redirecting to Google..."
          ) : (
            <>
              <FcGoogle />
              Login with Google
            </>
          )}
        </Button>

        {/* Registration link */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-brand-orange transition-colors hover:underline"
          >
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
