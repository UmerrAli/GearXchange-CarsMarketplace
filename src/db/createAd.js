import { supabase } from "../../configs/supabase-config";

const createAd = async function (user, data, imagesUrl) {
    const features = JSON.stringify({
        ac: data.ac === undefined ? false : true,
        alloy: data.alloy === undefined ? false : true,
        abs: data.abs === undefined ? false : true,
        power_steering: data.powerSteering === undefined ? false : true,
        power_windows: data.powerWindows === undefined ? false : true,
        immobilizer: data.immobilizer === undefined ? false : true,
        sun_roof: data.sunRoof === undefined ? false : true,
    });

    const { response, error } = await supabase.from("cars").insert([
        {
            title: data.title,
            make: data.make,
            model: data.model,
            city: data.city,
            price: data.price,
            features: features,
            images: imagesUrl,
            description: data.description,
            user_id: user?.id,
            color: data.color,
            mileage: data.milage,
            created_at: new Date().toISOString(),
        },
    ]);
    return { response, error };
};

export { createAd };
