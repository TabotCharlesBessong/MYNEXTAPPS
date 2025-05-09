"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";

const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size="lg" className="w-[50%] cursor-pointer" variant="outline" onClick={() => {}}>
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button size="lg" className="w-[50%] cursor-pointer" variant="outline" onClick={() => {}}>
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Social;
