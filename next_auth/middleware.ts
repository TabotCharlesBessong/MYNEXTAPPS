// auth middlware from authjs v5

import { auth } from "@/auth";

export default auth((req) => {
  // req.auth
  const isLoggedIn = !!req.auth
  console.log("Middleware auth request:", req.method, req.url);
  console.log(req.nextUrl.pathname)
  console.log("IS LOGGEDIN: ",isLoggedIn)
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
  // matcher for clerk next
  // matcher: ['/((?!.+\\.[\\w]+$|_next).*','/','(api|trpc)(.*)']
};