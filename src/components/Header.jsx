import React from "react";
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import Logo from "./Logo";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="flex justify-between space-x-2 mt-5 px-7">
      <Link to={"/"}>
        <Logo />
      </Link>
      <ul className="hidden md:flex gap-8 mt-2 ">
        <Link to={"/"}>
          <li className="font-medium hover:scale-105 transition-all cursor-pointer">
            Home
          </li>
        </Link>
        <Separator orientation="vertical" />
        <li className="font-medium hover:scale-105 transition-all cursor-pointer">
          Search
        </li>
        <Separator orientation="vertical" />
        <Link to={"/used"}>
          <li className="font-medium hover:scale-105 transition-all cursor-pointer">
            Used Cars
          </li>
        </Link>
        <Separator orientation="vertical" />
        <li className="font-medium hover:scale-105 transition-all cursor-pointer">
          About Us
        </li>
      </ul>
      {isSignedIn ? (
        <div className="flex items-center gap-5">
          <UserButton />
          <Link to={"/profile"}>
            <Button>Post an Ad</Button>
          </Link>
        </div>
      ) : (
        <div className="mr-10">
          <SignInButton mode="modal" forceRedirectUrl={"/profile"}>
            <Button>Post an Ad</Button>
          </SignInButton>
        </div>
      )}
    </div>
  );
}

export default Header;
