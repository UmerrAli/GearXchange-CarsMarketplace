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
          const { data, error, count } = await searchAds(
            filters,
            currentPage,
            pageSize,
          );
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
    <div className="flex min-h-screen flex-col bg-background transition-colors duration-300">
      <Header />
      <div className="mx-auto w-full max-w-7xl flex-grow px-6 py-12 md:px-20">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Used Cars
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Browse our global selection of quality pre-owned vehicles
            </p>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-border bg-card px-6 py-3 shadow-sm">
            <span className="text-2xl font-bold text-primary">
              {totalCount}
            </span>
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Total listing(s)
            </span>
          </div>
        </div>

        {/* Search Component */}
        <div className="mb-16 flex justify-center">
          <div className="w-full max-w-4xl">
            <SearchComponent onSearch={handleSearch} />
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-32">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
            <p className="animate-pulse font-medium text-muted-foreground">
              Finding your perfect car...
            </p>
          </div>
        ) : carsList.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
          <div className="rounded-3xl border border-dashed border-border bg-card py-32 text-center shadow-inner">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <span className="text-4xl text-muted-foreground">?</span>
            </div>
            <h3 className="mb-3 text-2xl font-bold tracking-tight text-foreground">
              No matching cars found
            </h3>
            <p className="mx-auto max-w-md text-lg text-muted-foreground">
              We couldn&apos;t find any listings matching your current filters.
              Try broadening your search.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default UsedCars;
