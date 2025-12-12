import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useAuth } from "../contexts/useAuth";
import { signOut } from "../../configs/supabase-config";

function Header() {
  const { user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };
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
      {user ? (
        <div className="flex items-center gap-5">
          <Link to={"/profile"}>
            <Button>Post an Ad</Button>
          </Link>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      ) : (
        <div className="mr-10">
          <Link to={"/sign-in"}>
            <Button>Post an Ad</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
