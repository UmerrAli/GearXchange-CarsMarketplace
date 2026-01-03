import Logo from "./Logo";
import { Separator } from "@/components/ui/separator";

function Footer() {
  return (
    <div className="mx-4">
      <Separator />
      <footer className="bg-gray-100">
        <div className="relative mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8 ">
          <div className="lg:flex lg:items-end lg:justify-between">
            <div>
              <Logo size="sm" />
              <p className="mx-auto mt-2 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
                The ultimate car marketplace to buy and sell cars seamlessly.
                Trusted by thousands of car enthusiasts.
              </p>
            </div>
          </div>

          <p className="mt-2 text-center text-sm text-gray-500 lg:text-right">
            Copyright &copy; 2025. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
