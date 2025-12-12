import { useEffect, useState } from "react";
import Header from "../../components/Header";
import CarCard from "../../components/CarCard";
import { supabase } from "../../../configs/supabase-config";

function UsedCars() {
  const [carsList, setCarsList] = useState([]);

  useEffect(() => {
    const getCarsList = async () => {
      try {
        const { data, error } = await supabase.from("cars").select("*");
        if (error) throw error;
        setCarsList(data || []);
      } catch (err) {
        console.error(err);
      }
    };
    getCarsList();
  }, []);

  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-20">
        <h2 className="font-bold text-2xl">Used Cars</h2>
        <div className="flex flex-wrap gap-10 items-start my-6">
          {carsList.map((car) => {
            return <CarCard car={car} key={car.id} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default UsedCars;
