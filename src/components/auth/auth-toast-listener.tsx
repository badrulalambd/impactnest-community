
"use client";

import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthToastListener() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (searchParams.get("auth") !== "google-success") {
      return;
    }

    // Prevent duplicate success notifications.
    if (hasShownToast.current) {
      return;
    }

    hasShownToast.current = true;

    toast.success("Login successful!");

    // Remove the temporary query parameter.
    const params = new URLSearchParams(searchParams.toString());
    params.delete("auth");

    const query = params.toString();
    const cleanUrl = query ? `/?${query}` : "/";

    router.replace(cleanUrl, { scroll: false });
  }, [searchParams, router]);

  return null;
}
