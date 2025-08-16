import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

// Protect admin routes except login and test
export const config = {
  matcher: [
    "/admin/((?!login|test|api|_next/static|_next/image|favicon.ico).*)",
  ],
};