import Header from "../../components/Header";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import CarCard from "../../components/CarCard";
import { useState, useEffect } from "react";
import { getProfileAds } from "../../db/getProfileAds";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteAd } from "../../db/deleteAd";
import Footer from "@/components/Footer";

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

  const handleDelete = async (carId) => {
    try {
      const { error } = await deleteAd(carId, user.id);
      if (error) throw error;

      // Update local state to remove the deleted car
      setCarsList((prev) => prev.filter((car) => car.id !== carId));
    } catch (error) {
      console.error("Error deleting ad: ", error);
    }
  };

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
        <div className="flex flex-wrap gap-6 items-start my-6 justify-center lg:justify-start">
          {carsList.map((car, index) => {
            return (
              <div key={car.id || index}>
                <CarCard car={car} />
                <Link to={`/new-ad?mode=edit&id=${car.id}`} state={{ car }}>
                  <Button className="mt-3">Edit</Button>
                </Link>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="ml-3 mt-3" variant="destructive">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your car listing
                        from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(car.id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
