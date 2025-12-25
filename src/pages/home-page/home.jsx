import Header from "../../components/Header";
import Hero from "../../components/Hero";
import FeaturedCars from "../../components/FeaturedCars";
import Footer from "../../components/Footer";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <FeaturedCars />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
