import { useState, useEffect } from "react";
import getAddDetails from "@/db/getAddDetails";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import UploadImages from "./components/UploadImages";
import { Label } from "@/components/ui/label";
import { features_Defination, carDetails, carModels } from "@/Shared/formData";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createAd } from "@/db/createAd";
import { uploadFile } from "@/db/uploadFile";
import { updateAd } from "@/db/updateAd";
import { useAuth } from "@/contexts/useAuth";
import { IoIosCloseCircleOutline } from "react-icons/io";

function AdUpsert() {
  const [formData, setFormData] = useState({});
  const [selectedFileList, setSelectedFileList] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [searchParams] = useSearchParams();

  const isEditMode = searchParams.get("mode") === "edit";
  const carId = searchParams.get("id");

  useEffect(() => {
    if (!isEditMode || !carId) return;

    const fetchCarData = async () => {
      try {
        const { data: carData, error } = await getAddDetails(carId);

        if (error) throw error;

        if (carData) {
          setExistingImages([...new Set(carData.images)]);

          const features = carData.features ? JSON.parse(carData.features) : {};

          setFormData({
            title: carData.title || "",
            make: carData.make || "",
            model: carData.model || "",
            year: carData.year || "",
            city: carData.city || "",
            price: carData.price || "",
            color: carData.color || "",
            milage: carData.mileage || "",
            description: carData.description || "",
            ...features,
          });
        }
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCarData();
  }, [isEditMode, carId]);

  const handleInputChange = (name, value) => {
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      if (name === "make") {
        newData.model = "";
      }
      return newData;
    });
  };

  const handleRemoveExistingImage = (indexToRemove) => {
    setExistingImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const uploadUrlsToStorage = async () => {
    try {
      return await Promise.all(selectedFileList.map((file) => uploadFile(file)));
    } catch (error) {
      console.error("Error uploading images:", error);
      return [];
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrls = [...existingImages];

      if (selectedFileList.length > 0) {
        const newUrls = await uploadUrlsToStorage();
        imageUrls = [...imageUrls, ...newUrls];
      }

      imageUrls = [...new Set(imageUrls)];

      if (isEditMode) {
        const { error } = await updateAd(Number(carId), formData, imageUrls, profile);
        if (error) throw error;
      } else {
        const { error } = await createAd(profile, formData, imageUrls);
        if (error) throw error;
      }

      setFormData({});
      setSelectedFileList([]);
      setExistingImages([]);
      navigate("/profile");
    } catch (error) {
      console.error("Error submitting ad:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="px-4 py-8 md:px-16 lg:px-32 md:py-12 bg-background transition-colors duration-300">
        <h2 className="font-bold text-3xl md:text-4xl text-center mb-8 md:mb-10 text-foreground">
          {isEditMode ? "Edit Your Ad" : "Create a New Ad"}
        </h2>
        <form
          className="bg-card text-card-foreground shadow-2xl rounded-3xl p-6 md:p-12 border border-border grid gap-8 md:gap-10"
          onSubmit={onSubmit}
        >
          {/* Car Details */}
          <div>
            <h3 className="font-bold text-2xl mb-6 text-foreground border-b border-border pb-2 inline-flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              Car Details
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {carDetails.map((detail) => (
                <div key={detail.name} className="space-y-2">
                  <label className="text-sm font-semibold tracking-wide text-muted-foreground uppercase opacity-80">{detail.label}</label>
                  {!detail.isDropdown && detail.type !== "dropdown" ? (
                    <Input
                      name={detail.name}
                      type={detail.type}
                      required
                      autoComplete="off"
                      className="bg-background/50"
                      value={formData[detail.name] || ""}
                      onChange={(e) => handleInputChange(detail.name, e.target.value)}
                    />
                  ) : (
                    <Select
                      required
                      value={formData[detail.name] || ""}
                      onValueChange={(value) => handleInputChange(detail.name, value)}
                      disabled={detail.name === "model" && !formData.make}
                    >
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder={`Select ${detail.label}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {(detail.name === "model" && formData.make
                          ? carModels[formData.make] || []
                          : detail.options
                        )?.map((option) =>
                          typeof option === "object" && option.province ? (
                            <div key={option.province}>
                              <SelectGroup>
                                <SelectLabel className="font-bold text-primary">{option.province}</SelectLabel>
                                {option.cities.map((city) => (
                                  <SelectItem key={city} value={city}>
                                    {city}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </div>
                          ) : (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold tracking-wide text-muted-foreground uppercase opacity-80">Description</label>
            <Textarea
              name="description"
              className="bg-background/50 min-h-[150px] rounded-xl focus:ring-primary/20"
              value={formData.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Tell us something about your car..."
            />
          </div>

          {/* Features */}
          <div className="mt-5 p-6 bg-muted/30 rounded-2xl border border-border/50">
            <h3 className="font-bold text-2xl mb-6 text-foreground inline-flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              Features
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {features_Defination.map((feature) => (
                <div key={feature.name} className="flex items-center space-x-3 group">
                  <Checkbox
                    name={feature.name}
                    id={feature.name}
                    className="w-5 h-5 rounded-md border-muted-foreground/30 data-[state=checked]:bg-primary"
                    checked={!!formData[feature.name]}
                    onCheckedChange={(value) => handleInputChange(feature.name, value)}
                  />
                  <Label htmlFor={feature.name} className="text-sm font-medium cursor-pointer group-hover:text-primary transition-colors">{feature.label}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Images */}
          <div className="mt-5">
            <h3 className="font-bold text-2xl mb-6 text-foreground inline-flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              Upload Images
            </h3>
            
            {existingImages.length > 0 && (
              <div className="mb-8 p-4 bg-muted/20 rounded-2xl border border-border/40">
                <p className="text-sm font-medium text-muted-foreground mb-4">Existing images:</p>
                <div className="flex gap-6 flex-wrap">
                  {existingImages.map((imgUrl, index) => (
                    <div key={index} className="relative group">
                      <div className="absolute -top-3 -right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <IoIosCloseCircleOutline
                          className="text-2xl text-red-600 cursor-pointer bg-background rounded-full shadow-lg hover:scale-110 transition-transform"
                          onClick={() => handleRemoveExistingImage(index)}
                        />
                      </div>
                      <img
                        src={imgUrl}
                        alt={`Existing ${index}`}
                        className="w-[140px] h-[140px] object-cover rounded-2xl border border-border/50 shadow-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <UploadImages
              selectedFileList={selectedFileList}
              setSelectedFileList={setSelectedFileList}
            />
          </div>

          <div className="flex justify-center pt-6 border-t border-border mt-6">
            {loading ? (
              <Button disabled className="w-full max-w-md py-6 text-lg rounded-2xl shadow-xl">
                <span className="animate-pulse">{isEditMode ? "Updating..." : "Submitting..."}</span>
              </Button>
            ) : (
              <Button type="submit" className="w-full max-w-md py-6 text-lg rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all">
                {isEditMode ? "Update Ad" : "Submit Listing"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdUpsert;