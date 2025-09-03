import { NextResponse } from "next/server";

const protectedRoutes = ["/compte", "/evenements/create"];

export default function middleware(request) {
  const path = request.nextUrl.pathname;
  const authCookie = request.cookies.get("auth_token");

  const isAuthPage =
    path.startsWith("/connexion") ||
    path.startsWith("/inscription") ||
    path.startsWith("/auth/callback");
  if (isAuthPage && authCookie) {
    return NextResponse.redirect(new URL("/compte/parametres", request.url));
  }

  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  if (!authCookie) {
    const encodedRedirectPath = encodeURIComponent(path);
    return NextResponse.redirect(
      new URL(`/connexion?redirect=${encodedRedirectPath}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
