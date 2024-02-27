"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { user, isLoaded } = useUser();
  return (
    <header>
      <nav
        className="flex items-center justify-between p-6 lg:px-8 h-20 border border-t-0 border-l-0 border-r-0 border-b-gray-600"
        aria-label="global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            Next.js authentication
          </a>
        </div>
        {user && isLoaded && (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <UserButton signInUrl="/" />
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
