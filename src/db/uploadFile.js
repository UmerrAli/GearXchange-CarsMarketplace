import { supabase } from "../../configs/supabase-config";
async function uploadFile(file) {
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    console.log("Uploading file:", fileName);

    const { data, error } = await supabase.storage
        .from("carImages")
        .upload(fileName, file);

    if (error) {
        console.error("File upload error:", error);
        return null;
    }

    console.log("File uploaded successfully:", data);

    // Retrieve the public URL of the uploaded file
    const { data: publicUrlData, error: urlError } = supabase.storage
        .from("carImages")
        .getPublicUrl(fileName);

    if (urlError) {
        console.error("Error retrieving public URL:", urlError);
        return null;
    }

    console.log("Public URL:", publicUrlData.publicUrl);

    return publicUrlData.publicUrl;
}

export { uploadFile };
