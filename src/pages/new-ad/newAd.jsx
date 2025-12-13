import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../../components/ui/button";
import UploadImages from "./components/UploadImages";
import { Label } from "@/components/ui/label";
import { features_Defination, carDetails } from "../../Shared/formData";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { createAd } from "../../db/createAd";
import { uploadFile } from "../../db/uploadFile";
import { updateAd } from "../../db/updateAd";
import { useAuth } from "../../contexts/useAuth";

function NewAd() {
  const [formData, setFormData] = useState({});
  const [selectedFileList, setSelectedFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const isEditMode = searchParams.get("mode") === "edit";
  const carId = searchParams.get("id");
  const carData = location.state?.car;

  useEffect(() => {
    if (isEditMode && carData) {
      // Parse features from JSON string if needed
      const parsedFeatures = carData.features && typeof carData.features === 'string'
        ? JSON.parse(carData.features)
        : carData.features || {};

      // Map database feature names (snake_case) to form feature names (camelCase)
      const mappedFeatures = {
        ac: parsedFeatures.ac || false,
        alloy: parsedFeatures.alloy || false,
        abs: parsedFeatures.abs || false,
        powerSteering: parsedFeatures.power_steering || false,
        powerWindows: parsedFeatures.power_windows || false,
        immobilizer: parsedFeatures.immobilizer || false,
        sunRoof: parsedFeatures.sun_roof || false,
      };

      // Pre-populate form with existing car data including mapped features
      setFormData({
        title: carData.title || "",
        make: carData.make || "",
        model: carData.model || "",
        city: carData.city || "",
        price: carData.price || "",
        color: carData.color || "",
        milage: carData.mileage || "",
        description: carData.description || "",
        ...mappedFeatures
      });

      // Note: Existing images are already in the database, no need to set selectedFileList
    }
  }, [isEditMode, carData]);

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  async function uploadUrlsToStorage() {
    setLoading(true);
    try {
      const newUrls = await Promise.all(
        selectedFileList.map(async (file) => {
          const url = await uploadFile(file);
          return url;
        })
      );
      return newUrls;
    } catch (error) {
      console.error("Error uploading images:", error);
      return [];
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let imagesUrl;

      // If editing and no new images selected, use existing images
      if (isEditMode && selectedFileList.length === 0 && carData?.images) {
        imagesUrl = carData.images;
      } else if (selectedFileList.length > 0) {
        // Upload new images
        imagesUrl = await uploadUrlsToStorage();
      } else {
        console.error("No images provided.");
        setLoading(false);
        return;
      }

      if (isEditMode) {
        // Update existing ad
        const { response, error } = await updateAd(Number(carId), formData, imagesUrl);
        if (error) {
          console.error("Update error:", error);
          throw error;
        }
      } else {
        // Create new ad
        const { response, error } = await createAd(user, formData, imagesUrl);
        if (error) throw error;
        console.log("Ad created successfully!");
      }

      setFormData({});
      setSelectedFileList([]);
      navigate("/profile");

    } catch (error) {
      console.error("Error submitting ad:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                      onChange={(e) =>
                        handleInputChange(detail.name, e.target.value)
                      }
                    />
                  ) : (
                    <Select
                      required
                      value={formData[detail.name] || ""}
                      onValueChange={(value) =>
                        handleInputChange(detail.name, value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={`Select ${detail.label}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {detail.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
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
                    checked={formData[feature.name] || false}
                    onCheckedChange={(value) =>
                      handleInputChange(feature.name, value)
                    }
                  />
                  <Label htmlFor={feature.name}>{feature.label}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Images */}
          <div className="mt-5">
            <h3 className="font-semibold text-xl mb-4">Upload Images</h3>
            {isEditMode && carData?.images && selectedFileList.length === 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Existing images:</p>
                <div className="flex gap-2 flex-wrap">
                  {JSON.parse(carData.images).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Car ${index + 1}`}
                      className="w-24 h-24 object-cover rounded border"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">Upload new images to replace existing ones</p>
              </div>
            )}
            <UploadImages
              selectedFileList={selectedFileList}
              setSelectedFileList={setSelectedFileList}
            />
          </div>

          {/* Submit Button or Loader */}
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

export default NewAd;
