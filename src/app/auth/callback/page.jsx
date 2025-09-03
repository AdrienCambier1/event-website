"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithToken } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    let redirectUrl = searchParams.get("redirect") || "/";
    if (redirectUrl.startsWith("/auth/callback")) redirectUrl = "/";

    if (!token) {
      router.replace(
        `/connexion?error=auth_failed&redirect=${encodeURIComponent(
          redirectUrl
        )}`
      );
      return;
    }

    loginWithToken(token, redirectUrl).catch(() => {
      router.replace(
        `/connexion?error=auth_failed&redirect=${encodeURIComponent(
          redirectUrl
        )}`
      );
    });
  }, [searchParams, router, loginWithToken]);

  return null;
}

export default function AuthCallbackPage() {
  return (
    <Suspense>
      <AuthCallbackContent />
    </Suspense>
  );
}
