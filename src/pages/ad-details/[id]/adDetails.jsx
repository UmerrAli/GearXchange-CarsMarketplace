import { useState, useEffect } from "react";
import Header from "../../../components/Header";
import DetailsHeader from "../components/DetailsHeader";
import { useParams } from "react-router-dom";
import { supabase } from "../../../../configs/supabase-config";
import Features from "../components/Features";
import { Button } from "../../../components/ui/button";
import Footer from "../../../components/Footer";
import { Calendar, Car, Fuel, Gauge, MapPin, Palette, Settings } from "lucide-react";

function AdDetails() {
  const { id } = useParams();
  const [adDetails, setAdDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdDetails = async () => {
      try {
        const { data, error } = await supabase
          .from("cars")
          .select("*")
          .eq("id", id)
          .single();

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

      <main className="flex-grow max-w-7xl mx-auto px-12 sm:px-6 lg:px-12 py-8 w-full">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : adDetails ? (
          <div className="flex flex-col gap-10">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

              {/* Left Column: Image Gallery */}
              <div className="w-full">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 overflow-hidden">
                  <DetailsHeader adDetails={adDetails} />
                </div>
              </div>

              {/* Right Column: Key Details & Call to Action */}
              <div className="flex flex-col gap-6">

                {/* Header Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium uppercase tracking-wide">
                      Used
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {adDetails.city || "Pakistan"}
                    </div>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                    {adDetails.title}
                  </h1>
                  <p className="text-sm text-gray-500">
                    Posted on {new Date(adDetails.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                {/* Price Section */}
                <div className="flex items-baseline gap-2 border-b pb-6 border-gray-100">
                  <span className="text-4xl font-extrabold text-primary">
                    Rs {Number(adDetails.price).toLocaleString()}
                  </span>
                </div>

                {/* Action Button */}
                <Button className="w-full text-lg py-7 rounded-xl shadow-lg shadow-green-200 bg-green-600 hover:bg-green-700 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
                  Call Seller
                </Button>

                {/* Quick Specs Grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-6 mt-2">
                  <InfoItem icon={Car} label="Make" value={adDetails.make} />
                  <InfoItem icon={Calendar} label="Year" value={adDetails.model} />
                  <InfoItem icon={Palette} label="Color" value={adDetails.color} />
                  <InfoItem icon={Gauge} label="Mileage" value={`${Number(adDetails.mileage).toLocaleString()} km`} />
                  <InfoItem icon={Settings} label="Transmission" value={adDetails.transmission} />
                  <InfoItem icon={Fuel} label="Fuel" value={adDetails.fuelType} />
                </div>
              </div>
            </div>

            {/* Detailed Info Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-2">

              {/* Description */}
              <div className="lg:col-span-2 bg-white rounded-2xl px-6 shadow-sm border border-gray-100 h-fit">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  Description
                </h2>
                <div className="prose prose-sm sm:prose-base text-gray-700 leading-7 whitespace-pre-line max-w-none">
                  {adDetails.description}
                </div>
              </div>

              {/* Features */}
              <div className="lg:col-span-1 bg-white rounded-2xl px-6 shadow-sm border border-gray-100 h-fit">
                <Features adDetails={adDetails} />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-32">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Ad not found</h3>
            <p className="text-gray-500 mb-6">The ad you are looking for does not exist or has been removed.</p>
            <Button variant="outline" onClick={() => window.history.back()}>
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
    <div className="flex items-start p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100">
      <div className="p-2 bg-gray-100 rounded-full text-gray-600 mr-3">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">{label}</span>
        <span className="font-semibold text-gray-900 text-base">{value}</span>
      </div>
    </div>
  );
}
