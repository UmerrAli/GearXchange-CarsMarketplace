import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useAuth } from "../contexts/useAuth";
import { signOut } from "../../configs/supabase-config";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

function Header() {
  const { user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="flex justify-between space-x-2 mt-5 px-7 md:px-10 lg:px-20">
      <Link to={"/"}>
        <Logo />
      </Link>
      <ul className="hidden md:flex gap-4 lg:gap-8 mt-2 ">
        <Link to={"/"}>
          <li className="font-medium hover:scale-105 transition-all cursor-pointer text-sm md:text-base lg:text-lg">
            Home
          </li>
        </Link>
        <Separator orientation="vertical" />
        <Link to={"/used"}>
          <li className="font-medium hover:scale-105 transition-all cursor-pointer text-sm md:text-base lg:text-lg">
            Used Cars
          </li>
        </Link>
        <Separator orientation="vertical" />
        <li className="font-medium hover:scale-105 transition-all cursor-pointer text-sm md:text-base lg:text-lg">
          About Us
        </li>
      </ul>
      {user ? (
        <div className="flex items-center gap-5">
          <Link to={"/profile"}>
            <Button className="hidden md:block">Post an Ad</Button>
          </Link>
          <Button variant="outline" onClick={handleSignOut} className="hidden md:flex">
            Sign Out
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-5">
          <Link to={"/sign-in"}>
            <Button className="hidden md:block">Post an Ad</Button>
          </Link>
        </div>
      )}

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center">
        <Sheet>
          <SheetTrigger>
            <Menu className="h-8 w-8" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-left mb-4 font-bold">Menu</SheetTitle>
              <div className="text-left flex flex-col gap-4 mt-4">

                <Link to={"/"} className="font-medium hover:text-primary">
                  Home
                </Link>
                <Link to={"/used"} className="font-medium hover:text-primary">
                  Used Cars
                </Link>
                <Link to={"#"} className="font-medium hover:text-primary">
                  About Us
                </Link>
                {user && (
                  <span
                    className="font-medium hover:text-primary cursor-pointer text-red-500"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </span>
                )}
                <Link to={user ? "/profile" : "/sign-in"}>
                  <Button className="w-full">Post an Ad</Button>
                </Link>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default Header;
