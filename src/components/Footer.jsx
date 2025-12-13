import React from "react";
import Logo from "./Logo";

function Footer() {
  return (
    <div>
      <footer className="bg-gray-100">
        <div className="relative mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8 lg:pt-24">
          <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
            <a
              className="inline-block rounded-full bg-primary p-2 text-white shadow transition hover:bg-primary/90 sm:p-3 lg:p-4"
              href="#"
            >
              <span className="sr-only">Back to top</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>

          <div className="lg:flex lg:items-end lg:justify-between">
            <div>
              <Logo />
              <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
                The ultimate car marketplace to buy and sell cars seamlessly.
                Trusted by thousands of car enthusiasts.
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500 lg:text-right">
            Copyright &copy; 2025. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
