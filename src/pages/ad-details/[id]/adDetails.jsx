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
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow px-4 sm:px-8 lg:px-12 py-10">
        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : adDetails ? (
          <div className="flex flex-col gap-10">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

              {/* Left Column: Image Gallery */}
              <div className="w-full">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2 overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <DetailsHeader adDetails={adDetails} />
                </div>
              </div>

              {/* Right Column: Key Details & Call to Action */}
              <div className="flex flex-col gap-8 justify-center">

                {/* Header Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider shadow-sm">
                      Used
                    </span>
                    <div className="flex items-center text-gray-500 text-sm font-medium bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                      <MapPin className="w-4 h-4 mr-1 text-primary" />
                      {adDetails.city || "Pakistan"}
                    </div>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight leading-tight font-display">
                    {adDetails.title}
                  </h1>
                  <p className="text-sm text-gray-500 font-medium">
                    Posted on {new Date(adDetails.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                {/* Price Section */}
                <div className="flex items-baseline gap-2 border-b pb-8 border-gray-200">
                  <span className="text-3xl font-bold tracking-tight">
                    Rs {Number(adDetails.price).toLocaleString()}
                  </span>
                </div>

                {/* Quick Specs Grid */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                  <InfoItem icon={Car} label="Make" value={adDetails.make} />
                  <InfoItem icon={Calendar} label="Year" value={adDetails.model} />
                  <InfoItem icon={Palette} label="Color" value={adDetails.color} />
                  <InfoItem icon={Gauge} label="Mileage" value={`${Number(adDetails.mileage).toLocaleString()} km`} />
                </div>

                {/* Action Button */}
                {!showPhoneNumber ? (
                  <Button
                    onClick={() => {
                      if (!user) {
                        toast.error("You must be logged in to contact the seller.");
                        // Optional: Navigate to login
                        // navigate("/auth/sign-in");
                      } else {
                        setShowPhoneNumber(true);
                      }
                    }}
                    className="w-full text-lg py-8 rounded-2xl shadow-xl shadow-primary/25 bg-primary hover:bg-primary/90 transition-all transform hover:-translate-y-1 active:translate-y-0 font-bold tracking-wide mt-4"
                  >
                    Call Seller
                  </Button>
                ) : (
                  <div className="w-full text-lg py-6 rounded-2xl border-2 border-primary bg-primary/5 text-primary text-center font-bold tracking-wide mt-4">
                    {adDetails.phone || "No phone number available"}
                  </div>
                )}
              </div>
            </div>

            {/* Detailed Info Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

              {/* Description */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-fit hover:shadow-md transition-shadow duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2 font-display">
                  Description
                </h2>
                <div className="prose prose-slate text-gray-600 leading-8 whitespace-pre-line max-w-none">
                  {adDetails.description}
                </div>
              </div>

              {/* Features */}
              <div className="lg:col-span-1 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-fit hover:shadow-md transition-shadow duration-300">
                <Features adDetails={adDetails} />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-32">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ad not found</h3>
            <p className="text-gray-500 mb-8 text-lg">The ad you are looking for does not exist or has been removed.</p>
            <Button variant="outline" size="lg" onClick={() => window.history.back()}>
              Go Back
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
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="p-3 bg-blue-50 rounded-xl">
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-0.5">{label}</span>
        <span className="font-bold text-gray-900 text-lg">{value}</span>
      </div>
    </div>
  );
}
