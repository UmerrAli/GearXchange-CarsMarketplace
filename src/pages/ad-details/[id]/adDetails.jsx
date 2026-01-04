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
import { useNavigate } from "react-router-dom";

function AdDetails() {
  const { id } = useParams();
  const [adDetails, setAdDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

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
    <div className="bg-background text-foreground min-h-screen flex flex-col transition-colors duration-300">
      <Header />

      <main className="flex-grow px-4 sm:px-8 lg:px-12 py-10">
        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : adDetails ? (
          <div className="flex flex-col gap-10 max-w-7xl mx-auto w-full">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

              {/* Left Column: Image Gallery */}
              <div className="w-full sticky top-24">
                <div className="bg-card rounded-3xl shadow-xl border border-border p-2 overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <DetailsHeader adDetails={adDetails} />
                </div>
              </div>

              {/* Right Column: Key Details & Call to Action */}
              <div className="flex flex-col gap-8">

                {/* Header Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>
                    </span>
                    <div className="flex items-center text-muted-foreground text-sm font-semibold bg-muted/50 px-4 py-1.5 rounded-full border border-border">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      {adDetails.city || "Pakistan"}
                    </div>
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight font-display mb-2">
                    {adDetails.title}
                  </h1>
                  <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Posted on {new Date(adDetails.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                {/* Price Section */}
                <div className="flex items-center justify-between py-6 border-y border-border">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-primary uppercase tracking-wider">Asking Price</span>
                    <span className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
                      Rs {Number(adDetails.price).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Quick Specs Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <InfoItem icon={Car} label="Make" value={adDetails.make} />
                  <InfoItem icon={Calendar} label="Model" value={adDetails.model} />
                  <InfoItem icon={Palette} label="Color" value={adDetails.color} />
                  <InfoItem icon={Gauge} label="Mileage" value={`${Number(adDetails.mileage).toLocaleString()} km`} />
                </div>

                {/* Action Button */}
                {!showPhoneNumber ? (
                  <Button
                    onClick={() => {
                      if (!user) {
                        toast.error("You must be logged in to contact the seller.");
                      } else {
                        setShowPhoneNumber(true);
                      }
                    }}
                    className="w-full text-xl py-8 rounded-2xl shadow-xl shadow-primary/30 bg-primary hover:bg-primary/90 transition-all transform hover:-translate-y-1 active:scale-95 font-bold tracking-wide mt-4"
                  >
                    Reveal Seller Phone Number
                  </Button>
                ) : (
                  <div className="w-full text-xl py-6 rounded-2xl border-2 border-primary bg-primary/10 text-primary text-center font-black tracking-widest mt-4 shadow-inner animate-in zoom-in-95 duration-300">
                    {adDetails.phone || "No phone number available"}
                  </div>
                )}
              </div>
            </div>

            {/* Detailed Info Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">

              {/* Description */}
              <div className="lg:col-span-2 bg-card rounded-3xl p-8 md:p-10 shadow-xl border border-border h-fit">
                <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3 font-display border-b border-border pb-4 w-full">
                  <span className="w-1.5 h-8 bg-primary rounded-full" />
                  Vehicle Description
                </h2>
                <div className="prose prose-slate dark:prose-invert text-muted-foreground leading-relaxed whitespace-pre-line max-w-none text-lg">
                  {adDetails.description}
                </div>
              </div>

              {/* Features */}
              <div className="lg:col-span-1 bg-card rounded-3xl p-8 shadow-xl border border-border h-fit">
                <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3 font-display border-b border-border pb-4 w-full">
                  <span className="w-1.5 h-8 bg-primary rounded-full" />
                  Key Features
                </h2>
                <Features adDetails={adDetails} />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-32 bg-card rounded-3xl border border-border shadow-2xl max-w-3xl mx-auto">
            <h3 className="text-4xl font-extrabold text-foreground mb-4 tracking-tight">Listing Not Found</h3>
            <p className="text-muted-foreground mb-10 text-lg">The car listing you are looking for might have been sold or removed.</p>
            <Button variant="default" size="lg" className="px-10 py-6 rounded-xl" onClick={() => window.history.back()}>
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
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-all duration-300 group">
      <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-0.5 opacity-60">{label}</span>
        <span className="font-bold text-foreground text-base tracking-tight">{value}</span>
      </div>
    </div>
  );
}
