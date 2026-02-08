const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  
  // FIXED: Match with your .env name
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); 

  try {
    const response = await fetch(
      // FIXED: Match with your .env name
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUDNAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Cloudinary Error Response:", errorData);
      throw new Error(errorData.error?.message || "Cloudinary upload failed");
    }

    const data = await response.json();
    
    // 👇 IMAGE COMPRESSION: WebP + Auto Quality + Cap width at 1200px
    const optimizedUrl = data.secure_url.replace('/upload/', '/upload/q_auto,f_auto,w_1200/');
    
    return optimizedUrl;

  } catch (error) {
    console.error("Cloudinary Function Error:", error);
    throw error;
  }
};

export default uploadToCloudinary;