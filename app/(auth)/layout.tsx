"use client";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import Navbar from "../(marketing)/_components/navbar";
import { Spinner } from "@/components/spinner";
import { DietProvider } from "@/context/diet-list";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { getToken, isSignedIn } = useAuth();
  if (!isSignedIn) return redirect("/");
  if (isSignedIn === undefined) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <DietProvider>
      <div className="h-full flex dark-bg[#1F1F1F] items-center justify-center">
        <Navbar />
        <main className="flex-1 h-full overflow-y-auto pt-20">{children}</main>
      </div>
    </DietProvider>
  );
};

export default AuthLayout;
