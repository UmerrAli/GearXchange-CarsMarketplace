import { supabase } from "../../configs/supabase-config";

const getProfileAds = async function (profile) {
    const { data, error } = await supabase
        .from("cars")
        .select("*, car_images(image_url, position)")
        .eq("profile_id", profile.id);

    if (error) {
        return { data: null, error };
    }

    const formattedData = data.map((car) => {
        const images = car.car_images
            ? car.car_images
                  .sort((a, b) => (a.position || 0) - (b.position || 0))
                  .map((img) => img.image_url)
            : [];
        
        return {
            ...car,
            images,
            model: car.year ? car.year.toString() : car.model,
        };
    });

    return { data: formattedData, error: null };
}

export { getProfileAds };