"use client";
import { Spinner } from "@/components/spinner";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignUpButton,
  currentUser,
  useAuth,
} from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import React from "react";
import { fetchUser } from "@/lib/actions/user.actions";

const Heading = () => {
  const { getToken, isSignedIn } = useAuth();

  if (isSignedIn) return redirect("/user");

  return (
    <section className=" flex  items-start justify-center h-screen w-full  ">
      <div className="flex items-center justify-center gap-12 max-md:flex-col">
        <div className="max-w-3xl space-y-4 text-start">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold ">
            {" "}
            Welcome to <span className="text-green-500">Diet App</span>
          </h1>
          {/* <h1>{user?.firstName}</h1> */}
          <h3 className="text-md font-medium  opacity-50">
            Uygulama amacı,diyet günlerinize ait istenilen bir kaç bilgiyi
            girerek diyetinizi takip etmenizi sağlamaktır.
            <br />
          </h3>
          {!isSignedIn && (
            <SignInButton mode="modal">
              <Button className="gap-2 transition" variant="outline">
                <FcGoogle />
                <p>Sign in with Google</p>
              </Button>
            </SignInButton>
          )}

          {isSignedIn === undefined && (
            <div className="w-full flex items-center justify-center">
              <Spinner size="lg" />
            </div>
          )}
          {isSignedIn && (
            <Button asChild>
              <Link href="/user">
                See your profile
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          )}
          {/* {!isSignedIn && (
            <SignInButton mode="modal">
              <Button>
                Get Jotion Free
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </SignInButton>
          )} */}
        </div>
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
          <Image
            src={"/diet-light.png"}
            fill
            className="object-contain dark:hidden"
            alt="Diet"
          />
          <Image
            src={"/diet-dark.png"}
            fill
            className="object-contain dark:block hidden"
            alt="Diet"
          />
        </div>
      </div>
    </section>
  );
};

export default Heading;
