import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/useAuth";
import CarCard from "@/components/CarCard";
import { useState, useEffect } from "react";
import { getProfileAds } from "@/db/getProfileAds";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Phone } from "lucide-react";
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
import { useNavigate } from "react-router-dom";

function Profile() {
  const { profile } = useAuth();
  const [carsList, setCarsList] = useState([]);
  const [phoneNumberAvailable, setPhoneNumberAvailable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    if (profile) {
      profile.phone
        ? setPhoneNumberAvailable(true)
        : setPhoneNumberAvailable(false);
    }
    fetchAds();
  }, [profile, navigate]);

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
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />
      {phoneNumberAvailable || (
        <div className="px-4 py-8 md:px-20">
          <Alert className="relative overflow-hidden rounded-2xl border-amber-500/20 bg-amber-500/10">
            <div className="relative flex flex-col items-start justify-between gap-6 p-2 md:flex-row md:items-center">
              <div className="flex items-center gap-5">
                <div className="rounded-2xl bg-amber-500/20 p-3">
                  <Phone className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="space-y-1">
                  <AlertTitle className="text-lg font-bold tracking-tight text-amber-800 dark:text-amber-200">
                    Unlock Direct Contact
                  </AlertTitle>
                  <AlertDescription className="text-sm leading-relaxed text-amber-700 dark:text-amber-300">
                    Potential buyers can&apos;t see your phone number yet. Add
                    it to start receiving inquiries.
                  </AlertDescription>
                </div>
              </div>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full shrink-0 rounded-xl bg-amber-600 px-8 py-6 font-bold text-white shadow-lg shadow-amber-600/20 transition-all hover:bg-amber-700 hover:shadow-amber-600/30 active:scale-95 md:w-auto">
                    Set Phone Number
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-3xl border-border bg-card sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold tracking-tight">
                      Contact Information
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      This number will be displayed on your car listings when
                      revealed by visitors.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        placeholder="+92 300 1234567"
                        className="rounded-xl bg-background/50 py-6 text-lg"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter className="gap-3 sm:justify-end">
                    <DialogClose asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        className="rounded-xl"
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type="button"
                      onClick={handleAddPhoneNumber}
                      disabled={loading}
                      className="rounded-xl px-8"
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </Alert>
        </div>
      )}
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-20">
        <div className="mb-10 flex flex-col items-center justify-between gap-6 border-b border-border pb-8 sm:flex-row">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-foreground">
              My Listings
            </h2>
            <p className="mt-1 text-muted-foreground">
              Manage your active car advertisements
            </p>
          </div>
          <Link to={phoneNumberAvailable ? "/ad-upsert" : ""}>
            <Button
              disabled={!phoneNumberAvailable}
              className="rounded-2xl px-8 py-6 text-lg shadow-lg shadow-primary/20 transition-all active:scale-95"
            >
              <span className="mr-2 text-xl">+</span> Add New Ad
            </Button>
          </Link>
        </div>

        {carsList.length > 0 ? (
          <div className="grid grid-cols-1 justify-center gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {carsList.map((car, index) => {
              return (
                <div
                  key={car.id || index}
                  className="group rounded-[2.5rem] border border-border bg-card p-4 shadow-xl transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="flex justify-center">
                    <CarCard car={car} />
                  </div>
                  <div className="mt-4 flex gap-3 p-2">
                    <Link
                      to={`/ad-upsert?mode=edit&id=${car.id}`}
                      state={{ car }}
                      className="flex-1"
                    >
                      <Button
                        className="w-full rounded-2xl bg-secondary py-6 font-bold text-secondary-foreground transition-all hover:bg-secondary/80"
                        variant="secondary"
                      >
                        Edit Details
                      </Button>
                    </Link>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          className="rounded-2xl px-6 py-6 font-bold transition-all"
                          variant="destructive"
                        >
                          Remove
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-3xl border-border bg-card">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-2xl font-bold tracking-tight">
                            Confirm Deletion
                          </AlertDialogTitle>
                          <AlertDialogDescription className="leading-relaxed text-muted-foreground">
                            Are you absolutely sure you want to remove this
                            listing? This action cannot be undone and will
                            delete all associated data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="gap-3">
                          <AlertDialogCancel className="rounded-xl">
                            Keep Listing
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(car.id)}
                            className="rounded-xl bg-destructive px-6 shadow-destructive/20 transition-all hover:bg-destructive/90 hover:shadow-destructive/30"
                          >
                            Delete Permanently
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-[3rem] border border-dashed border-border bg-card py-32 text-center">
            <h3 className="mb-4 text-2xl font-bold text-foreground">
              No Active Ads
            </h3>
            <p className="mb-10 max-w-sm leading-relaxed text-muted-foreground">
              You haven&apos;t listed any cars for sale yet. Start your first
              listing to reach thousands of buyers.
            </p>
            <Link to={phoneNumberAvailable ? "/ad-upsert" : ""}>
              <Button
                disabled={!phoneNumberAvailable}
                variant="outline"
                className="rounded-2xl border-primary px-10 py-6 font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
              >
                Create My First Ad
              </Button>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
