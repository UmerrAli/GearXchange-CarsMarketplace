import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, MapPin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

function Contact() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
      <Header />
      <main className="flex-grow px-2 md:px-6">
        {/* Hero Section */}
        <div className="py-6 text-center md:py-12">
          <h1 className="font-display mb-6 text-2xl font-extrabold tracking-tight text-primary md:text-5xl">
            About GearXchange
          </h1>
          <p className="text-md mx-4 leading-relaxed text-muted-foreground md:text-xl">
            Revolutionizing the way you buy and sell cars. Trusted, transparent,
            and built for enthusiasts.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:py-8 lg:gap-20">
          {/* Mission Content */}
          <div className="space-y-6">
            <h2 className="font-display text-xl font-bold text-foreground">
              Our Mission
            </h2>
            <div className="text-muted-foreground">
              <p>
                {
                  "At GearXchange, we believe finding your dream car shouldn't be a hassle. We've built a platform that connects buyers and sellers directly, cutting out the middlemen and ensuring clarity in every transaction."
                }
              </p>
              <p>
                {
                  "Whether you're looking for a reliable daily driver or a high-performance machine, our marketplace is designed to help you make informed decisions with detailed listings and transparent pricing."
                }
              </p>
            </div>
          </div>

          {/* Contact / Developer Card */}
          <div className="rounded-3xl border border-border bg-card p-8 text-card-foreground shadow-xl">
            <h3 className="font-display mb-6 text-2xl font-bold text-foreground">
              Get in Touch
            </h3>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/60">
                    Email
                  </p>
                  <p className="md:text-md text-sm font-medium text-foreground">
                    support@gearxchange.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/60">
                    Location
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    Abbottabad, Pakistan
                  </p>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h4 className="mb-4 text-sm font-semibold text-foreground sm:text-lg">
                  Connect with the Developer
                </h4>
                <a
                  href="https://github.com/UmerrAli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    className="w-full gap-2 rounded-xl py-6 text-sm shadow-md transition-transform active:scale-95 sm:text-lg"
                    variant="default"
                  >
                    <Github className="h-6 w-6" />
                    Visit GitHub Profile
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Contact;
