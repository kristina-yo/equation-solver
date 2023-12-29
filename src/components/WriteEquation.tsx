import { Dispatch, SetStateAction } from "react";
import Canvas from "./Canvas";

const WriteEquation = ({
  setSelectedImage,
}: {
  setSelectedImage: Dispatch<SetStateAction<File | undefined>>;
}) => {
  return (
    <div className="flex flex-col">
      <span className="text-xl mb-1">Write a math problem</span>
      <Canvas setSelectedImage={setSelectedImage} />
    </div>
  );
};

export default WriteEquation;
