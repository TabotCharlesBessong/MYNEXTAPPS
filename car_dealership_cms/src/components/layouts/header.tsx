import { navLinks } from "@/config/constants";
import { routes } from "@/config/routes";
import type { Favourites } from "@/config/types";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";
import { HeartIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SignOutForm } from "../auth/sign-out-form";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { ImgixImage } from "../ui/imgix-image";
// import { auth } from "../../app/auth";

export const PublicHeader = async () => {
  // const session = await auth();
  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId ?? "");
  return (
    <header className="flex items-center justify-between h-16 px-4 bg-transparent gap-x-6">
      <div className="flex items-center flex-1">
        <Link href={routes.home} className="flex items-center gap-2">
          <ImgixImage
            width={300}
            height={100}
            alt="logo"
            className="relative"
            src="/logo.svg"
          />
        </Link>
      </div>
      <nav className="hidden md:block">
        {navLinks.map((link) => (
          <Link
            className="group font-heading rounded px-3 py-2 text-base text-foreground hover:text-primary duration-300 transition-all ease-in-out font-semibold uppercase"
            href={link.href}
            key={link.id}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      {/* {session ? (
        <div className="items-center md:flex gap-x-6 hidden">
          <Link href={routes.admin.dashboard} className="text-foreground">
            Backoffice
          </Link>
          <SignOutForm />
        </div>
      ) : (
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="relative inline-block group"
        >
          <Link href={routes.favourites}>
            <div className="flex group-hover:bg-pink-500 diratopm-200 transition-colors ease-in-out items-center justify-center w-10 h-10 bg-muted rounded-full">
              <HeartIcon className="w-6 h-6 text-primary group-hover:text-white group-hover:fill-white" />
            </div>
            <div className="absolute -top-1 5 -right-1.5 flex items-center justify-center w-5 h-5 text-white bg-pink-500 rounded-full group-hover:bg-primary">
              <span className="text-xs">
                {favourites ? favourites.ids.length : 0}
              </span>
            </div>
          </Link>
        </Button>
      )} */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="link" size="icon" className="md:hidden border-none">
            <MenuIcon className="h-6 w-6 text-primary" />
            <SheetTitle className="sr-only">Toggle nav menu</SheetTitle>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full max-w-xs p-4 bg-white">
          <nav className="grid gap-2">
            {navLinks.map((link) => (
              <Link
                className="flex items-center gap-2 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                href={link.href}
                key={link.id}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};
