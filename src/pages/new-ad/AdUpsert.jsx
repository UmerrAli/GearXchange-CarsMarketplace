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
      <div className="px-6 md:px-16 lg:px-32 py-12">
        <h2 className="font-bold text-3xl text-center mb-10">
          {isEditMode ? "Edit Your Ad" : "Create a New Ad"}
        </h2>
        <form
          className="bg-white shadow-lg rounded-lg p-8 grid gap-8"
          onSubmit={onSubmit}
        >
          {/* Car Details */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Car Details</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {carDetails.map((detail) => (
                <div key={detail.name}>
                  <label className="block text-sm mb-2">{detail.label}</label>
                  {!detail.isDropdown && detail.type !== "dropdown" ? (
                    <Input
                      name={detail.name}
                      type={detail.type}
                      required
                      autoComplete="off"
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
                      <SelectTrigger>
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
                                <SelectLabel>{option.province}</SelectLabel>
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

          <div>
            <label className="block text-sm mb-2">Description</label>
            <Textarea
              name="description"
              value={formData.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>

          {/* Features */}
          <div className="mt-5">
            <h3 className="font-semibold text-xl mb-4">Features</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {features_Defination.map((feature) => (
                <div key={feature.name} className="flex items-center space-x-2">
                  <Checkbox
                    name={feature.name}
                    id={feature.name}
                    checked={!!formData[feature.name]}
                    onCheckedChange={(value) => handleInputChange(feature.name, value)}
                  />
                  <Label htmlFor={feature.name}>{feature.label}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Images */}
          <div className="mt-5">
            <h3 className="font-semibold text-xl mb-4">Upload Images</h3>
            
            {existingImages.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Existing images:</p>
                <div className="flex gap-4 flex-wrap">
                  {existingImages.map((imgUrl, index) => (
                    <div key={index} className="relative flex-shrink-0">
                      <IoIosCloseCircleOutline
                        className="absolute -top-2 -right-2 z-10 text-xl text-red-600 cursor-pointer bg-white rounded-full shadow-md hover:scale-110 transition-transform"
                        onClick={() => handleRemoveExistingImage(index)}
                      />
                      <img
                        src={imgUrl}
                        alt={`Existing ${index}`}
                        className="w-[120px] h-[120px] object-cover rounded-xl border border-gray-200"
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

          <div className="flex justify-center">
            {loading ? (
              <Button disabled className="w-full max-w-xs">
                {isEditMode ? "Updating..." : "Submitting..."}
              </Button>
            ) : (
              <Button type="submit" className="w-full max-w-xs">
                {isEditMode ? "Update Ad" : "Submit"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdUpsert;