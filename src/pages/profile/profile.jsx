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
    if(!profile) {
      navigate("/");
      return;
    }
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
      profile.phone ? setPhoneNumberAvailable(true) : setPhoneNumberAvailable(false);
    }
    fetchAds();
    
  },[profile]);

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
    <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
      <Header />
      {phoneNumberAvailable || (
        <div className="px-4 md:px-20 py-8">
          <Alert className="bg-amber-500/10 border-amber-500/20 rounded-2xl overflow-hidden relative">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative p-2">
               <div className="flex gap-5 items-center">
                  <div className="p-3 bg-amber-500/20 rounded-2xl">
                    <Phone className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="space-y-1">
                    <AlertTitle className="text-amber-800 dark:text-amber-200 font-bold text-lg tracking-tight">Unlock Direct Contact</AlertTitle>
                    <AlertDescription className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">
                      Potential buyers can't see your phone number yet. Add it to start receiving inquiries.
                    </AlertDescription>
                  </div>
              </div>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full md:w-auto bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-6 rounded-xl shadow-lg shadow-amber-600/20 hover:shadow-amber-600/30 transition-all active:scale-95 shrink-0">
                    Set Phone Number
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md rounded-3xl border-border bg-card">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold tracking-tight">Contact Information</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      This number will be displayed on your car listings when revealed by visitors.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        placeholder="+92 300 1234567"
                        className="bg-background/50 py-6 rounded-xl text-lg"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter className="sm:justify-end gap-3">
                    <DialogClose asChild>
                      <Button type="button" variant="ghost" className="rounded-xl">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="button" onClick={handleAddPhoneNumber} disabled={loading} className="rounded-xl px-8">
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </Alert>
        </div>
      )}
      <div className="px-4 md:px-20 py-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-b border-border pb-8 mb-10">
          <div>
            <h2 className="font-extrabold text-4xl text-foreground tracking-tight">My Listings</h2>
            <p className="text-muted-foreground mt-1">Manage your active car advertisements</p>
          </div>
          <Link  to={phoneNumberAvailable ? "/ad-upsert" : ""}>
            <Button disabled={!phoneNumberAvailable} className="px-8 py-6 text-lg rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95">
              <span className="mr-2 text-xl">+</span> Add New Ad
            </Button>
          </Link>
        </div>
        
        {carsList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 justify-center">
            {carsList.map((car, index) => {
              return (
                <div key={car.id || index} className="group bg-card rounded-[2.5rem] p-4 border border-border shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="flex justify-center">
                  <CarCard car={car} />
                  </div>
                  <div className="flex gap-3 p-2 mt-4">
                    <Link to={`/ad-upsert?mode=edit&id=${car.id}`} state={{ car }} className="flex-1">
                      <Button className="w-full py-6 rounded-2xl bg-secondary text-secondary-foreground hover:bg-secondary/80 font-bold transition-all" variant="secondary">Edit Details</Button>
                    </Link>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="py-6 rounded-2xl font-bold transition-all px-6" variant="destructive">Remove</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-3xl border-border bg-card">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-2xl font-bold tracking-tight">Confirm Deletion</AlertDialogTitle>
                          <AlertDialogDescription className="text-muted-foreground leading-relaxed">
                            Are you absolutely sure you want to remove this listing? This action cannot be undone and will delete all associated data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="gap-3">
                          <AlertDialogCancel className="rounded-xl">Keep Listing</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(car.id)} className="bg-destructive hover:bg-destructive/90 rounded-xl px-6">
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
          <div className="text-center py-32 bg-card rounded-[3rem] border border-dashed border-border flex flex-col items-center">
             <h3 className="text-2xl font-bold text-foreground mb-4">No Active Ads</h3>
             <p className="text-muted-foreground max-w-sm mb-10 leading-relaxed">
               You haven't listed any cars for sale yet. Start your first listing to reach thousands of buyers.
             </p>
             <Link to={phoneNumberAvailable ? "/ad-upsert" : ""}>
               <Button disabled={!phoneNumberAvailable} variant="outline" className="rounded-2xl px-10 py-6 font-bold hover:bg-primary hover:text-primary-foreground border-primary text-primary transition-all">Create My First Ad</Button>
             </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
