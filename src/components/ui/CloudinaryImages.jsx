import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { cloudinary } from "@/service";

const CloudinaryImage = ({ publicId }) => {
  const img = cloudinary
    .image(publicId)
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(400).height(400));

  return <AdvancedImage cldImg={img} />;
};

export default CloudinaryImage;
