import Logo from "./Logo";
import { Separator } from "@/components/ui/separator";

function Footer() {
  return (
    <div className="mx-4 my-4 md:mx-8 md:my-6">
      <Separator />
      <footer className="mt-2 rounded-2xl bg-secondary/30 text-secondary-foreground sm:mt-4">
        <div className="relative max-w-screen-xl px-4 py-4 sm:py-6 lg:px-8">
          <div className="lg:flex lg:items-end lg:justify-between">
            <div>
              <Logo size="sm" />
              <p className="mt-2 text-center text-xs leading-relaxed text-muted-foreground sm:mt-6 sm:text-left sm:text-base">
                The ultimate car marketplace to buy and sell cars seamlessly.
                Trusted by thousands of car enthusiasts.
              </p>
            </div>
          </div>

          <p className="mt-2 text-center text-xs text-muted-foreground sm:mt-4 sm:text-left">
            Copyright &copy; {new Date().getFullYear()} GearXchange. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
