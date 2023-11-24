import React from "react";
import { Button } from "@/components/ui/button";
import { MdOutlineFoodBank } from "react-icons/md";

const Footer = () => {
  return (
    <div className="flex items-center dark:bg-background w-full p-6 bg-background z-50">
      <MdOutlineFoodBank size="40" />

      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
};

export default Footer;
