import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { createAd } from "../../db/createAd";
import { uploadFile } from "../../db/uploadFile";
import { useAuth } from "../../contexts/useAuth";

function NewAd() {
  const [formData, setFormData] = useState({});
  const [selectedFileList, setSelectedFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

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

    const imagesUrl = await uploadUrlsToStorage();

    if (imagesUrl.length > 0) {
      try {
        setLoading(true);
        const { response, error } = await createAd(user, formData, imagesUrl);

        if (error) throw error;

        console.log("Ad created successfully!");
        setFormData({});
        setSelectedFileList([]);
        navigate("/profile");

      } catch (error) {
        console.error("Error adding document:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("No images uploaded.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="px-6 md:px-16 lg:px-32 py-12">
        <h2 className="font-bold text-3xl text-center mb-10">
          Create a New Ad
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
                      onChange={(e) =>
                        handleInputChange(detail.name, e.target.value)
                      }
                    />
                  ) : (
                    <Select
                      required
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
            <UploadImages
              selectedFileList={selectedFileList}
              setSelectedFileList={setSelectedFileList}
            />
          </div>

          {/* Submit Button or Loader */}
          <div className="flex justify-center">
            {loading ? (
              <Button disabled className="w-full max-w-xs">
                Submitting...
              </Button>
            ) : (
              <Button type="submit" className="w-full max-w-xs">
                Submit
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewAd;
