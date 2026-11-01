"use client";

import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthToastListener() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasShownToast = useRef(false);

  const authStatus = searchParams.get("auth");
  const queryString = searchParams.toString();

  useEffect(() => {
    if (
      authStatus !== "google-success" ||
      hasShownToast.current
    ) {
      return;
    }

    // Prevent duplicate success notifications.
    hasShownToast.current = true;

    toast.success("Login successful!");

    // Remove the temporary authentication parameter.
    const params = new URLSearchParams(queryString);
    params.delete("auth");

    const remainingQuery = params.toString();
    const cleanUrl = remainingQuery
      ? `/?${remainingQuery}`
      : "/";

    router.replace(cleanUrl, { scroll: false });
  }, [authStatus, queryString, router]);

  return null;
}