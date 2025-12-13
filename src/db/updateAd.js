import { supabase } from "../../configs/supabase-config";

export const updateAd = async (id, data, imagesUrl) => {
    const features = JSON.stringify({
        ac: data.ac ? true : false,
        alloy: data.alloy ? true : false,
        abs: data.abs ? true : false,
        power_steering: data.powerSteering ? true : false,
        power_windows: data.powerWindows ? true : false,
        immobilizer: data.immobilizer ? true : false,
        sun_roof: data.sunRoof ? true : false,
    });

    const { data: response, error } = await supabase
        .from("cars")
        .update({
            title: data.title,
            make: data.make,
            model: data.model,
            city: data.city,
            price: data.price,
            features: features,
            images: imagesUrl,
            description: data.description,
            color: data.color,
            mileage: data.milage,
        })
        .eq("id", id)
        .select();

    return { response, error };
};
