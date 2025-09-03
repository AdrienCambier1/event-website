"use client";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";

function AuthCallbackContent() {
  const searchParams = useSearchParams();
  const { loginWithToken } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    let redirectUrl = searchParams.get("redirect") || "/";
    if (redirectUrl.startsWith("/auth/callback")) redirectUrl = "/";

    if (!token) {
      window.location.href = `/connexion?error=auth_failed&redirect=${encodeURIComponent(
        redirectUrl
      )}`;
      return;
    }

    loginWithToken(token, redirectUrl).catch(() => {
      window.location.href = `/connexion?error=auth_failed&redirect=${encodeURIComponent(
        redirectUrl
      )}`;
    });
  }, [searchParams, loginWithToken]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Image
        src="/google-logo.png"
        width={200}
        height={100}
        alt="Google Logo"
      />
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense>
      <AuthCallbackContent />
    </Suspense>
  );
}
