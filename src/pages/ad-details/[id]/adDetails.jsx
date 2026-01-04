import { useState, useEffect } from "react";
import Header from "@/components/Header";
import DetailsHeader from "../components/DetailsHeader";
import { useParams } from "react-router-dom";
import Features from "../components/Features";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { Calendar, Car, Gauge, MapPin, Palette } from "lucide-react";
import getAddDetails from "@/db/getAddDetails";
import { useAuth } from "@/contexts/useAuth";
import { toast } from "sonner";

function AdDetails() {
  const { id } = useParams();
  const [adDetails, setAdDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAdDetails = async () => {
      try {
        const { data, error } = await getAddDetails(id);
        if (error) throw error;
        setAdDetails(data);
      } catch (error) {
        console.error("Error fetching ad details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchAdDetails();
    }
  }, [id]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
      <Header />

      <main className="flex-grow px-4 py-10 sm:px-8 lg:px-12">
        {loading ? (
          <div className="flex h-[60vh] items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
          </div>
        ) : adDetails ? (
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-16">
              {/* Left Column: Image Gallery */}
              <div className="sticky top-24 w-full">
                <div className="overflow-hidden rounded-3xl border border-border bg-card p-2 shadow-xl transition-all duration-300 hover:shadow-2xl">
                  <DetailsHeader adDetails={adDetails} />
                </div>
              </div>

              {/* Right Column: Key Details & Call to Action */}
              <div className="flex flex-col gap-8">
                {/* Header Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span></span>
                    <div className="flex items-center rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm font-semibold text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4 text-primary" />
                      {adDetails.city || "Pakistan"}
                    </div>
                  </div>
                  <h1 className="font-display mb-2 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
                    {adDetails.title}
                  </h1>
                  <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Posted on{" "}
                    {new Date(adDetails.created_at).toLocaleDateString(
                      undefined,
                      { year: "numeric", month: "long", day: "numeric" },
                    )}
                  </p>
                </div>

                {/* Price Section */}
                <div className="flex items-center justify-between border-y border-border py-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold uppercase tracking-wider text-primary">
                      Asking Price
                    </span>
                    <span className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
                      Rs {Number(adDetails.price).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Quick Specs Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <InfoItem icon={Car} label="Make" value={adDetails.make} />
                  <InfoItem
                    icon={Calendar}
                    label="Model"
                    value={adDetails.model}
                  />
                  <InfoItem
                    icon={Palette}
                    label="Color"
                    value={adDetails.color}
                  />
                  <InfoItem
                    icon={Gauge}
                    label="Mileage"
                    value={`${Number(adDetails.mileage).toLocaleString()} km`}
                  />
                </div>

                {/* Action Button */}
                {!showPhoneNumber ? (
                  <Button
                    onClick={() => {
                      if (!user) {
                        toast.error(
                          "You must be logged in to contact the seller.",
                        );
                      } else {
                        setShowPhoneNumber(true);
                      }
                    }}
                    className="mt-4 w-full transform rounded-2xl bg-primary py-8 text-xl font-bold tracking-wide shadow-xl shadow-primary/30 transition-all hover:-translate-y-1 hover:bg-primary/90 active:scale-95"
                  >
                    Reveal Seller Phone Number
                  </Button>
                ) : (
                  <div className="mt-4 w-full rounded-2xl border-2 border-primary bg-primary/10 py-6 text-center text-xl font-black tracking-widest text-primary shadow-inner duration-300 animate-in zoom-in-95">
                    {adDetails.phone || "No phone number available"}
                  </div>
                )}
              </div>
            </div>

            {/* Detailed Info Section */}
            <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Description */}
              <div className="h-fit rounded-3xl border border-border bg-card p-8 shadow-xl md:p-10 lg:col-span-2">
                <h2 className="font-display mb-8 flex w-full items-center gap-3 border-b border-border pb-4 text-2xl font-bold text-foreground">
                  <span className="h-8 w-1.5 rounded-full bg-primary" />
                  Vehicle Description
                </h2>
                <div className="prose prose-slate dark:prose-invert max-w-none whitespace-pre-line text-lg leading-relaxed text-muted-foreground">
                  {adDetails.description}
                </div>
              </div>

              {/* Features */}
              <div className="h-fit rounded-3xl border border-border bg-card p-8 shadow-xl lg:col-span-1">
                <h2 className="font-display mb-8 flex w-full items-center gap-3 border-b border-border pb-4 text-2xl font-bold text-foreground">
                  <span className="h-8 w-1.5 rounded-full bg-primary" />
                  Key Features
                </h2>
                <Features adDetails={adDetails} />
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card py-32 text-center shadow-2xl">
            <h3 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground">
              Listing Not Found
            </h3>
            <p className="mb-10 text-lg text-muted-foreground">
              The car listing you are looking for might have been sold or
              removed.
            </p>
            <Button
              variant="default"
              size="lg"
              className="rounded-xl px-10 py-6"
              onClick={() => window.history.back()}
            >
              Return to Search
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default AdDetails;

function InfoItem({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-muted/30 p-4 transition-all duration-300 hover:bg-muted/50">
      <div className="rounded-xl bg-primary/10 p-3 text-primary transition-transform group-hover:scale-110">
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex flex-col">
        <span className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-60">
          {label}
        </span>
        <span className="text-base font-bold tracking-tight text-foreground">
          {value}
        </span>
      </div>
    </div>
  );
}
