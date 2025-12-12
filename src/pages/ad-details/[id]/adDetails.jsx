import { useState, useEffect } from "react";
import Header from "../../../components/Header";
import DetailsHeader from "../components/DetailsHeader";
import { useParams } from "react-router-dom";
import { supabase } from "../../../../configs/supabase-config";
import Features from "../components/Features";
import { Button } from "../../../components/ui/button";

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
    <div>
      <Header />
      <div className="flex justify-end mt-7 mr-10">
        <Button className="bg-green-500 text-white hover:bg-green-600 py-2 px-4 rounded-lg">
          Call Now
        </Button>
      </div>
      <div className="p-10 md:px-20">
        {loading ? (
          <p>Loading ad details...</p>
        ) : adDetails ? (
          <div>
            <DetailsHeader adDetails={adDetails} />
            <div className="px-56">
              <div className="text-lg mt-5 grid grid-cols-2 gap-4">
                <h1 className="font-semibold">
                  Make: <span className="font-normal">{adDetails.make}</span>
                </h1>
                <h1 className="font-semibold">
                  Model Year:{" "}
                  <span className="font-normal">{adDetails.model}</span>
                </h1>
                <h1 className="font-semibold">
                  Color: <span className="font-normal">{adDetails.color}</span>
                </h1>
                <h1 className="font-semibold">
                  Mileage:{" "}
                  <span className="font-normal">{adDetails.mileage}</span>
                </h1>
                <h1 className="font-semibold">
                  Price: <span className="font-normal">{adDetails.price}</span>
                </h1>
              </div>

              <h1 className="text-2xl font-bold mt-5">Description</h1>
              <h2> {adDetails.description}</h2>
              <Features adDetails={adDetails} />
            </div>
          </div>
        ) : (
          <p>No ad details found.</p>
        )}
      </div>
    </div>
  );
}

export default AdDetails;
