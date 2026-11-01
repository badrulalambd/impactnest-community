"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
    LuArrowRight,
    LuCheck,
    LuEye,
    LuEyeOff,
    LuImage,
    LuLock,
    LuMail,
    LuUser,
    LuX,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { cn } from "cn";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

const passwordRules = [
    {
        label: "At least one uppercase letter (A-Z)",
        test: (value: string) => /[A-Z]/.test(value),
    },
    {
        label: "At least one lowercase letter (a-z)",
        test: (value: string) => /[a-z]/.test(value),
    },
    {
        label: "Minimum 8 characters length",
        test: (value: string) => value.length >= 8,
    },
];

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

const RegisterPage = () => {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const failedRules = passwordRules.filter((rule) => !rule.test(password));

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (failedRules.length > 0) {
            toast.error(
                `Password doesn't meet the requirements: ${failedRules[0].label}.`
            );
            return;
        }

        const formData = new FormData(event.currentTarget);
        const userData = Object.fromEntries(formData.entries()) as { name: string, email: string, url: string, password: string };
        console.log("Register FormData: ", userData)

        const { data, error } = await authClient.signUp.email({
            ...userData,
        });
        if (data) {
            console.log("Signup successfully!", data)
            toast.success("Registration successful!");
            router.push("/login");
        }
        else if(error?.code == "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
            console.log("Signup failed: ", error);
            toast.error("User already exists. Use another email.");
        }
        else{
            console.log("Signup failed: ", error);
            toast.error("Registration Failed. Please try again");
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-muted/30 px-4 pb-8">
            <div className="w-full max-w-md rounded-2xl border border-border/60 bg-card p-8 shadow-[0_12px_40px_-12px_rgba(7,55,99,0.18)]">
                <div className="flex flex-col items-center text-center">
                    <div>
                        <Image
                            src='/fav.png'
                            width={120}
                            height={120}
                            alt="small logo"
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-brand-navy dark:text-foreground">
                        Your Journey Starts Here
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Join ImpactNest and help build stronger, more caring communities together.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="space-y-1.5">
                        <label
                            htmlFor="fullName"
                            className="text-sm font-semibold text-foreground"
                        >
                            Full Name
                        </label>
                        <div className="relative">
                            <FieldIcon icon={LuUser} />
                            <input
                                id="fullName"
                                type="text"
                                name="name"
                                autoComplete="name"
                                required
                                placeholder="Badrul Alam"
                                className={inputClassName}
                                value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                            />
                        </div>
                    </div>

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
                            htmlFor="photoUrl"
                            className="text-sm font-semibold text-foreground"
                        >
                            Profile Photo URL
                        </label>
                        <div className="relative">
                            <FieldIcon icon={LuImage} />
                            <input
                                id="photoUrl"
                                type="url"
                                name="url"
                                autoComplete="url"
                                placeholder="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
                                className={inputClassName}
                                value={photoUrl}
                                onChange={(event) => setPhotoUrl(event.target.value)}
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
                                autoComplete="new-password"
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

                    <ul className="space-y-1.5" aria-label="Password requirements">
                        {passwordRules.map((rule) => {
                            const passed = rule.test(password);
                            return (
                                <li
                                    key={rule.label}
                                    className={cn(
                                        "flex items-center gap-2 text-xs transition-colors",
                                        passed
                                            ? "text-brand-green"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    {passed ? (
                                        <LuCheck className="size-3.5 shrink-0" />
                                    ) : (
                                        <LuX className="size-3.5 shrink-0" />
                                    )}
                                    {rule.label}
                                </li>
                            );
                        })}
                    </ul>

                    <Button
                        type="submit"
                        className="h-11 w-full bg-brand-navy font-semibold text-white hover:bg-brand-navy/90 dark:bg-brand-orange dark:hover:bg-brand-orange/90"
                    >
                        Register
                        <LuArrowRight className="size-4" />
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-brand-orange transition-colors hover:underline"
                    >
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
