import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useAuth } from "@/contexts/useAuth";
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
import { ModeToggle } from "@/components/mode-toggle";

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
        <li className="cursor-pointer text-sm font-medium text-gray-700 transition-colors hover:text-primary dark:text-gray-200 dark:hover:text-primary md:text-base">
          Home
        </li>
      </Link>
      <Link to={"/used"}>
        <li className="cursor-pointer text-sm font-medium text-gray-700 transition-colors hover:text-primary dark:text-gray-200 dark:hover:text-primary md:text-base">
          Used Cars
        </li>
      </Link>
      <Link to={"/about-us"}>
        <li className="cursor-pointer text-sm font-medium text-gray-700 transition-colors hover:text-primary dark:text-gray-200 dark:hover:text-primary md:text-base">
          About Us
        </li>
      </Link>
    </>
  );

  return (
    <div className="sticky top-0 z-50 mb-1 w-full">
      <div className="glass flex items-center justify-between px-6 py-4 transition-all duration-300 md:px-14 lg:px-20">
        <Link to={"/"} className="flex-shrink-0">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 md:flex">
          <NavItems />
        </ul>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          <ModeToggle />
          {user ? (
            <>
              <Link to={"/profile"}>
                <Button
                  className="font-semibold shadow-md transition-transform active:scale-95"
                  variant="default"
                >
                  Post an Ad
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="font-medium text-gray-600 hover:bg-gray-100 hover:text-red-500 dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-red-400"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Link to={"/sign-in"}>
              <Button className="font-semibold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 active:scale-95">
                Post an Ad
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-700">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <SheetHeader>
                <div className="mb-6 flex items-center justify-between">
                  <SheetTitle className="text-left font-serif text-2xl font-bold">
                    Menu
                  </SheetTitle>
                  <ModeToggle />
                </div>
                <div className="flex flex-col gap-6 text-lg">
                  <div className="flex list-none flex-col gap-4">
                    <NavItems />
                  </div>

                  <div className="my-2 h-px bg-gray-100" />

                  {user ? (
                    <div className="flex flex-col gap-3">
                      <Link to={"/profile"} className="w-full">
                        <Button className="w-full" size="lg">
                          Post an Ad
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        onClick={handleSignOut}
                        className="w-full border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600"
                      >
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Link to={"/sign-in"}>
                      <Button className="w-full" size="lg">
                        Log In / Sign Up
                      </Button>
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
