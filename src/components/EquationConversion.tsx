import { Mode } from "@/app/page";
import ImagePreview from "./ImagePreview";
import WriteEquation from "./WriteEquation";
import { generateEquation, solve } from "@/queries/generateEquation";
import { useEffect, useState } from "react";

const EquationConversion = ({
  mode,
  selectedImage,
}: {
  mode: Mode;
  selectedImage: File | undefined;
}) => {
  const [convertedEquation, setConvertedEquation] = useState<
    TGenerateEquationResponse | undefined
  >();
  let imageUrl = "";
  if (selectedImage) {
    imageUrl = URL.createObjectURL(selectedImage);
  }
  const [canvasImage, setCanvasImage] = useState<File | undefined>(
    selectedImage
  );
  const handleConvert = async (selectedImage: File) => {
    const formData = new FormData();
    formData.append("image", selectedImage);

    const data = await generateEquation(formData);
    setConvertedEquation(data);
  };

  useEffect(() => {
    console.log("hello");

    setCanvasImage(undefined);
  }, [mode]);
  console.log(canvasImage);

  return (
    <div className="space-y-4">
      {mode === Mode.Upload && selectedImage && (
        <ImagePreview equationImage={imageUrl} />
      )}
      {mode === Mode.Write && <WriteEquation setCanvasImage={setCanvasImage} />}
      {canvasImage && (
        <button
          className="primary-button-small"
          onClick={() => handleConvert(canvasImage)}
        >
          Convert
        </button>
      )}
      {convertedEquation && (
        <div className="flex  space-x-4 items-start">
          <span className="font-bold text-black text-lg">Result: </span>
          <div className="flex flex-col text-lg">
            {convertedEquation.result?.map((result, i) => (
              <span key={i}>{result}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EquationConversion;
