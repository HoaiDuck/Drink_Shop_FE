import axios from "axios";

const uploadImageToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    const data = response.data;
    return data.secure_url; // Trả về URL ảnh
  } catch (err) {
    console.error("Upload failed:", err);
  }
};

export default uploadImageToCloudinary;
