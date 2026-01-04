import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import CarCard from "@/components/CarCard";
import getAds from "@/db/getAds";
import Footer from "@/components/Footer";
import SearchComponent from "@/components/Search";
import { searchAds } from "@/db/searchAd";
import CustomPagination from "@/components/CustomPagination";

function UsedCars() {
  const [carsList, setCarsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 8;
  const currentPage = parseInt(searchParams.get("page") || "0");

  useEffect(() => {
    const getCarsList = async () => {
      try {
        setLoading(true);
        window.scrollTo({ top: 0, behavior: "smooth" });

        const make = searchParams.get("make");
        const model = searchParams.get("model");
        const city = searchParams.get("city");
        const maxPrice = searchParams.get("maxPrice");
        const minPrice = searchParams.get("minPrice");

        if (make || model || city || maxPrice || minPrice) {
          const filters = { make, model, city, maxPrice, minPrice };
          const { data, error, count } = await searchAds(filters, currentPage, pageSize);
          if (error) throw error;
          setCarsList(data || []);
          setTotalCount(count || 0);

        } else {
          const { data, error, count } = await getAds(currentPage, pageSize);
          if (error) throw error;
          setCarsList(data || []);
          setTotalCount(count || 0);
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getCarsList();
  }, [searchParams, currentPage]);

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage.toString());
    setSearchParams(newParams);
  };

  const handleSearch = (filters) => {
    const newParams = new URLSearchParams();
    if (filters.make) newParams.set("make", filters.make);
    if (filters.city) newParams.set("city", filters.city);
    if (filters.model) newParams.set("model", filters.model);
    if (filters.maxPrice) newParams.set("maxPrice", filters.maxPrice);
    if (filters.minPrice) newParams.set("minPrice", filters.minPrice);
    newParams.set("page", "0");
    setSearchParams(newParams);
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-300">
      <Header />
      <div className="px-6 md:px-20 py-12 flex-grow max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="font-extrabold text-4xl sm:text-5xl text-foreground tracking-tight">
              Used Cars
            </h2>
            <p className="text-muted-foreground mt-2 text-lg">Browse our global selection of quality pre-owned vehicles</p>
          </div>
          <div className="flex items-center gap-4 bg-card px-6 py-3 rounded-2xl border border-border shadow-sm">
             <span className="text-primary font-bold text-2xl">{totalCount}</span>
             <span className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Total listing(s)</span>
          </div>
        </div>

        {/* Search Component */}
        <div className="flex justify-center mb-16">
          <div className="w-full max-w-4xl">
            <SearchComponent onSearch={handleSearch} />
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-muted-foreground font-medium animate-pulse">Finding your perfect car...</p>
          </div>
        ) : carsList.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
              {carsList.map((car) => {
                return <CarCard car={car} key={car.id} />;
              })}
            </div>

            <CustomPagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        ) : (
          <div className="text-center py-32 bg-card rounded-3xl border border-dashed border-border shadow-inner">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
              <span className="text-4xl text-muted-foreground">?</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">
              No matching cars found
            </h3>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              We couldn't find any listings matching your current filters. Try broadening your search.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default UsedCars;
