"use client";
import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";

enum Mode {
  Upload,
  Write,
}
const HeroAction = ({
  setMode,
  setSelectedImage,
}: {
  setMode: Dispatch<SetStateAction<Mode>>;
  setSelectedImage: Dispatch<SetStateAction<File | undefined>>;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    setMode(Mode.Upload);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      setSelectedImage(selectedFile);
    }
  };

  return (
    <>
      <div className="space-x-4 mt-5 flex justify-center">
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

        <button
          className="primary-button"
          onClick={() => {
            setMode(Mode.Write);
          }}
        >
          Write
        </button>
      </div>
    </>
  );
};

export default HeroAction;
