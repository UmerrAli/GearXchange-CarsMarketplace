import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/useAuth";
import CarCard from "@/components/CarCard";
import { useState, useEffect } from "react";
import { getProfileAds } from "@/db/getProfileAds";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Phone } from "lucide-react";
import { getProfilePhoneNumber } from "@/db/getProfilePhoneNumber";
import { addProfilePhoneNumber } from "@/db/addProfilePhoneNumber";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

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
import { deleteAd } from "@/db/deleteAd";
import Footer from "@/components/Footer";

function Profile() {
  const { profile } = useAuth();
  const [carsList, setCarsList] = useState([]);
  const [phoneNumberAvailable, setPhoneNumberAvailable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAds() {
      try {
        if (profile) {
          const { data, error } = await getProfileAds(profile);
          if (error) throw error;
          if (data) setCarsList(data);
        }
      } catch (error) {
        console.error("Error fetching ads: ", error);
      }
    }
    async function fetchPhoneNumber() {
      try {
        if (profile) {
          const { data, error } = await getProfilePhoneNumber(profile);
          if (error) throw error;
          console.log(data)
          if (data) setPhoneNumberAvailable(true);
        }
      } catch (error) {
        console.error("Error fetching phone number: ", error);
      }
    }
    fetchPhoneNumber();
    fetchAds();
  }, [profile]);

  const handleDelete = async (carId) => {
    try {
      const { error } = await deleteAd(carId, profile);
      if (error) throw error;

      // Update local state to remove the deleted car
      setCarsList((prev) => prev.filter((car) => car.id !== carId));
    } catch (error) {
      console.error("Error deleting ad: ", error);
    }
  };

  const handleAddPhoneNumber = async () => {
    if (!phoneNumber) return;
    setLoading(true);
    try {
      const { error } = await addProfilePhoneNumber(profile, phoneNumber);
      if (error) throw error;
      setPhoneNumberAvailable(true);
      setIsModalOpen(false);
      setPhoneNumber(""); 
    } catch (error) {
      console.error("Error adding phone number: ", error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div>
      <Header />
      {phoneNumberAvailable || (<div className="px-10 md:px-20 my-6">
        <Alert className="bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative">
             <div className="flex gap-4 items-center">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                  <Phone className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <AlertTitle className="text-yellow-800 dark:text-yellow-200 font-semibold">Missing Phone Number</AlertTitle>
                  <AlertDescription className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
                    Please add your phone number to your profile to ensure seamless communication for your ads.
                  </AlertDescription>
                </div>
            </div>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="w-full md:w-auto bg-yellow-600 hover:bg-yellow-700 text-white border-none shadow-sm shrink-0">
                  Add Phone Number
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Phone Number</DialogTitle>
                  <DialogDescription>
                    Enter your phone number to allow potential buyers to contact you.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="phone" className="sr-only">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+1234567890"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <Button type="button" onClick={handleAddPhoneNumber} disabled={loading}>
                    {loading ? "Saving..." : "Save Phone Number"}
                  </Button>
                   <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </Alert>
      </div>)}
      <div className="px-10 md:px-20 my-10">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">My Ads</h2>
          <Link to={"/ad-upsert"}>
            <Button disabled={!phoneNumberAvailable}>+ Add New</Button>
          </Link>
        </div>
        <div className="flex flex-wrap gap-6 items-start my-6 justify-center lg:justify-start">
          {carsList.map((car, index) => {
            return (
              <div key={car.id || index}>
                <CarCard car={car} />
                <Link to={`/ad-upsert?mode=edit&id=${car.id}`} state={{ car }}>
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
