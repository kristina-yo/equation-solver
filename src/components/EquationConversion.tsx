import { Mode } from "@/app/page";
import ImagePreview from "./ImagePreview";
import WriteEquation from "./WriteEquation";
import { generateEquation, solve } from "@/queries/generateEquation";
import { useState } from "react";

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
  const handleConvert = async (selectedImage: File) => {
    const formData = new FormData();
    formData.append("image", selectedImage);

    const data = await generateEquation(formData);
    setConvertedEquation(data);
  };
  console.log(convertedEquation?.result?.[0]);

  return (
    <div className="space-y-4">
      {mode === Mode.Upload && selectedImage && (
        <ImagePreview equationImage={imageUrl} />
      )}
      {mode === Mode.Write && <WriteEquation />}
      {selectedImage && (
        <button
          className="primary-button-small"
          onClick={() => handleConvert(selectedImage)}
        >
          Convert
        </button>
      )}
      {convertedEquation && mode === Mode.Upload && (
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
