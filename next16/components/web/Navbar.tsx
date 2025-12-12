import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";

const Navbar = () => {
  return (
    <nav className="w-full py-5 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-2xl font-bold">
          <h1 className="text-3xl font-bold">
            Next <span className="text-blue-500">Pro</span>{" "}
          </h1>
        </Link>

        {/* div with links */}
        <div className="flex items-center gap-6">
          <Link className={buttonVariants({ variant: "ghost" })} href="/">
            Home
          </Link>
          <Link className={buttonVariants({ variant: "ghost" })} href="/blog">
            Blog
          </Link>
          <Link className={buttonVariants({ variant: "ghost" })} href="/create">
            Create
          </Link>
        </div>
      </div>

      {/* div with buttons */}
      <div className="flex items-center gap-4">
        <Link href="/login" className={buttonVariants({ variant: "outline" })}>
          Login
        </Link>
        <Link href="/signup" className={buttonVariants()}>
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
