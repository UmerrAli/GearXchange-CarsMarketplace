import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/Header";
import CarCard from "../../components/CarCard";
import getAds from "../../db/getAds";
import Footer from "../../components/Footer";
import SearchComponent from "../../components/Search";
import { searchAds } from "../../db/searchAd";

function UsedCars() {
  const [carsList, setCarsList] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const getCarsList = async () => {
      try {
        setLoading(true);

        const make = searchParams.get("make");
        const city = searchParams.get("city");
        const maxPrice = searchParams.get("maxPrice");

        if (make || city || maxPrice) {
          const filters = { make, city, maxPrice };
          const { data, error } = await searchAds(filters);
          if (error) throw error;
          setCarsList(data || []);
          const { data: allData } = await getAds();
          setAllCars(allData || []);

        } else {
          const { data, error } = await getAds();
          if (error) throw error;
          setCarsList(data || []);
          setAllCars(data || []);
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getCarsList();
  }, [searchParams]);

  const handleSearch = async (filters) => {
    try {
      setLoading(true);

      // If no filters, show all cars
      if (!filters.make && !filters.city && !filters.maxPrice) {
        setCarsList(allCars);
      } else {
        const { data, error } = await searchAds(filters);
        if (error) throw error;
        setCarsList(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="px-6 md:px-20 my-10">
        <h2 className="font-bold text-3xl mb-6">Used Cars</h2>

        {/* Search Component */}
        <div className="flex justify-center mb-10">
          <SearchComponent onSearch={handleSearch} />
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : carsList.length > 0 ? (
          <>
            <p className="text-sm text-gray-600 mb-4">{carsList.length} car(s) found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
              {carsList.map((car) => {
                return <CarCard car={car} key={car.id} />;
              })}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No cars found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default UsedCars;
