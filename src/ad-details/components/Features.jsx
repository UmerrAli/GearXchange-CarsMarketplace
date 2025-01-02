import React from "react";
import { features } from "./../../Shared/formData";
import { CiCircleCheck } from "react-icons/ci";

function Features({ adDetails }) {
  // Filter features with `true` values in adDetails
  const availableFeatures = features.filter(
    (feature) => adDetails[feature.name] === "true"
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mt-5">Features</h1>
      <ul className="mt-3 space-y-2">
        {availableFeatures.length > 0 ? (
          availableFeatures.map((feature) => (
            <li
              key={feature.name}
              className="text-lg text-gray-700 flex items-center"
            >
              <span
                className="material-icons-outlined mr-2 text-green-500"
                aria-label="Enabled feature"
              >
                <CiCircleCheck />
              </span>
              {feature.label}
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
