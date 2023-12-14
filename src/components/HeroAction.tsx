"use client";
import { ChangeEvent, useRef, useState } from "react";
import ImagePreview from "./ImagePreview";

const HeroAction = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);
    }
  };
  return (
    <>
      <div className="space-x-4">
        <button className="primary-button" onClick={handleButtonClick}>
          Upload
        </button>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <button className="primary-button">Write</button>
      </div>
      {selectedImage && <ImagePreview equationImage={selectedImage} />}
    </>
  );
};

export default HeroAction;
