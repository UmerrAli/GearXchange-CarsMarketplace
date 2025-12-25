import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useAuth } from "../contexts/useAuth";
import { signOut } from "../../configs/supabase-config";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const NavItems = () => (
    <>
      <Link to={"/"}>
        <li className="font-medium text-gray-700 hover:text-primary transition-colors cursor-pointer text-sm md:text-base">
          Home
        </li>
      </Link>
      <Link to={"/used"}>
        <li className="font-medium text-gray-700 hover:text-primary transition-colors cursor-pointer text-sm md:text-base">
          Used Cars
        </li>
      </Link>
      <Link to={"/about-us"}>
        <li className="font-medium text-gray-700 hover:text-primary transition-colors cursor-pointer text-sm md:text-base">
          About Us
        </li>
      </Link>
    </>
  );

  return (
    <div className="sticky top-0 z-50 w-full mb-1">
      <div className="glass px-6 md:px-14 lg:px-20 py-4 flex justify-between items-center transition-all duration-300">
        <Link to={"/"} className="flex-shrink-0">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 items-center">
          <NavItems />
        </ul>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link to={"/profile"}>
                <Button className="font-semibold shadow-md active:scale-95 transition-transform" variant="default">Post an Ad</Button>
              </Link>
              <Button variant="ghost" onClick={handleSignOut} className="font-medium text-gray-600 hover:bg-gray-100 hover:text-red-500">
                Sign Out
              </Button>
            </>
          ) : (
            <Link to={"/sign-in"}>
              <Button className="font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95">Post an Ad</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-700">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <SheetHeader>
                <SheetTitle className="text-left mb-6 font-bold text-2xl font-serif">Menu</SheetTitle>
                <div className="flex flex-col gap-6 text-lg">
                  <div className="flex flex-col gap-4 list-none">
                    <NavItems />
                  </div>

                  <div className="h-px bg-gray-100 my-2" />

                  {user ? (
                    <div className="flex flex-col gap-3">
                      <Link to={"/profile"} className="w-full">
                        <Button className="w-full" size="lg">Post an Ad</Button>
                      </Link>
                      <Button variant="outline" onClick={handleSignOut} className="w-full text-red-500 border-red-100 hover:bg-red-50 hover:text-red-600">
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Link to={"/sign-in"}>
                      <Button className="w-full" size="lg">Log In / Sign Up</Button>
                    </Link>
                  )}
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

export default Header;
