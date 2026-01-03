import { features_Defination } from "@/Shared/formData";
import { CiCircleCheck } from "react-icons/ci";

function Features({ adDetails }) {
  const features = JSON.parse(adDetails.features);
  const availableFeatures = features_Defination
    .filter((featureDef) => features[featureDef.name])
    .map((featureDef) => featureDef.label);

  return (
    <div>
      <h1 className="text-2xl font-bold mt-5">Features</h1>
      <ul className="mt-3 space-y-2">
        {availableFeatures.length > 0 ? (
          availableFeatures.map((feature) => (
            <li
              key={feature}
              className="text-lg text-gray-700 flex items-center"
            >
              <span
                className="material-icons-outlined mr-2 text-green-500"
                aria-label="Enabled feature"
              >
                <CiCircleCheck />
              </span>
              {feature}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No features available</p>
        )}
      </ul>
    </div>
  );
}

export default Features;
