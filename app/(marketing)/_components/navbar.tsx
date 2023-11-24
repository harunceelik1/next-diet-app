"use client";
import { SignInButton, UserButton, useUser, useAuth } from "@clerk/clerk-react";

import Link from "next/link";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MdOutlineFoodBank } from "react-icons/md";
import { Spinner } from "@/components/spinner";
import { UserIcon } from "lucide-react";
const Navbar = () => {
  const scrolled = useScrollTop();
  const { getToken, isSignedIn } = useAuth();

  return (
    <div
      className={cn(
        "z-50  bg-background dark:bg-background fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <MdOutlineFoodBank size="40" />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isSignedIn && (
          <>
            {/* <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">
                <UserIcon />
              </Link>
            </Button> */}
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
