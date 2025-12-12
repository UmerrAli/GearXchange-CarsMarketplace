import Header from "../../components/Header";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import CarCard from "../../components/CarCard";
import { useState, useEffect } from "react";
import { getProfileAds } from "../../db/getProfileAds";

function Profile() {
  const { user } = useAuth();
  const [carsList, setCarsList] = useState([]);

  useEffect(() => {
    async function fetchAds() {
      try {
        if (user) {
          const { data, error } = await getProfileAds(user);
          if (error) throw error;
          if (data) setCarsList(data);
        }
      } catch (error) {
        console.error("Error fetching ads: ", error);
      }
    }
    fetchAds();
  }, [user]);

  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-20">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">My Ads</h2>
          <Link to={"/new-ad"}>
            <Button>+ Add New</Button>
          </Link>
        </div>
        <div className="flex flex-wrap gap-10 items-start my-6">
          {carsList.map((car, index) => {
            return (
              <div key={car.id || index}>
                <CarCard car={car} />
                <Button className="mt-3">Edit</Button>
                <Button className="ml-3 mt-3">Delete</Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
