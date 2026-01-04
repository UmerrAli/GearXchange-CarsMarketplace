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
              className="group flex items-center rounded-xl border border-border/30 bg-muted/20 p-3 text-lg text-muted-foreground transition-colors hover:bg-muted/40"
            >
              <span
                className="mr-3 rounded-lg bg-primary/10 p-1.5 text-primary transition-transform group-hover:scale-110"
                aria-label="Enabled feature"
              >
                <CiCircleCheck className="h-5 w-5" />
              </span>
              <span className="whitespace-nowrap font-medium tracking-tight">
                {feature}
              </span>
            </li>
          ))
        ) : (
          <p className="rounded-xl border border-dashed border-border bg-muted/20 py-4 text-center italic text-muted-foreground">
            No specific features listed
          </p>
        )}
      </ul>
    </div>
  );
}

export default Features;
