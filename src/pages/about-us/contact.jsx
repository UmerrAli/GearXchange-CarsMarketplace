import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, MapPin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />
      <main className="flex-grow px-6">
        {/* Hero Section */}
        <div className="py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight font-display bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:to-blue-400">
            About GearXchange
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-muted-foreground">
            {"Revolutionizing the way you buy and sell cars. Trusted, transparent, and built for enthusiasts."}
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Mission Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground font-display">Our Mission</h2>
            <div className="prose prose-lg text-muted-foreground dark:prose-invert">
              <p>
                {"At GearXchange, we believe finding your dream car shouldn't be a hassle. We've built a platform that connects buyers and sellers directly, cutting out the middlemen and ensuring clarity in every transaction."}
              </p>
              <p>
                {"Whether you're looking for a reliable daily driver or a high-performance machine, our marketplace is designed to help you make informed decisions with detailed listings and transparent pricing."}
              </p>
            </div>
          </div>

          {/* Contact / Developer Card */}
          <div className="bg-card text-card-foreground p-8 rounded-3xl border border-border shadow-xl">
            <h3 className="text-2xl font-bold text-foreground mb-6 font-display">Get in Touch</h3>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/60">Email</p>
                  <p className="font-medium text-lg text-foreground">support@gearxchange.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/60">Location</p>
                  <p className="font-medium text-lg text-foreground">Abbottabad, Pakistan</p>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h4 className="text-lg font-semibold text-foreground mb-4">Connect with the Developer</h4>
                <a
                  href="https://github.com/UmerrAli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full gap-2 text-lg py-6 rounded-xl shadow-lg transition-transform active:scale-95" variant="default">
                    <Github className="w-6 h-6" />
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
