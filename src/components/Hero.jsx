import Search from "@/components/Search";

function Hero() {
  return (
    <div className="relative isolate -mt-16 flex min-h-[600px] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 to-white px-6 pt-14 transition-colors duration-300 dark:from-slate-900 dark:to-background lg:px-8">
      {/* Dynamic Backgrounds */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden opacity-60 blur-3xl dark:opacity-40 sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl py-12 text-center sm:py-20 lg:py-24">
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-foreground drop-shadow-sm md:text-7xl">
          Find Your Dream Car{" "}
          <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-primary text-transparent dark:to-blue-400">
            Today
          </span>
        </h1>
        <p className="mx-auto mb-12 mt-6 max-w-2xl text-lg leading-8 text-muted-foreground dark:text-gray-300 md:text-xl">
          Explore a wide range of cars, from used to new, and make the purchase
          that&apos;s right for you with{" "}
          <span className="font-semibold text-foreground">GearXchange</span>.
        </p>

        <div className="perspective-1000 flex w-full justify-center">
          <div className="w-full max-w-4xl transform transition-transform duration-500 hover:scale-[1.01]">
            <Search />
          </div>
        </div>
      </div>

      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden opacity-60 blur-3xl dark:opacity-40 sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#06b6d4] to-[#3b82f6] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}

export default Hero;
