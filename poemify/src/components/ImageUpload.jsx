import { useState } from "react";

const ImageUpload = ({ setImage, setPreview }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="mb-4">
      <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border p-2" />
    </div>
  );
};

export default ImageUpload;
