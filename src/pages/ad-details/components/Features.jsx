import { features_Defination } from "@/Shared/formData";
import { CiCircleCheck } from "react-icons/ci";

function Features({ adDetails }) {
  const features = JSON.parse(adDetails.features);
  const availableFeatures = features_Defination
    .filter((featureDef) => features[featureDef.name])
    .map((featureDef) => featureDef.label);

  return (
    <div className="w-full">
      <ul className="grid grid-cols-1 gap-4">
        {availableFeatures.length > 0 ? (
          availableFeatures.map((feature) => (
            <li
              key={feature}
              className="text-lg text-muted-foreground flex items-center bg-muted/20 p-3 rounded-xl border border-border/30 hover:bg-muted/40 transition-colors group"
            >
              <span
                className="mr-3 text-primary bg-primary/10 p-1.5 rounded-lg group-hover:scale-110 transition-transform"
                aria-label="Enabled feature"
              >
                <CiCircleCheck className="w-5 h-5" />
              </span>
              <span className="font-medium tracking-tight whitespace-nowrap">{feature}</span>
            </li>
          ))
        ) : (
          <p className="text-muted-foreground italic text-center py-4 bg-muted/20 rounded-xl border border-dashed border-border">No specific features listed</p>
        )}
      </ul>
    </div>
  );
}

export default Features;
