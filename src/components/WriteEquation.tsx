import { Dispatch, SetStateAction } from "react";
import Canvas from "./Canvas";

const WriteEquation = ({
  setCanvasImage,
}: {
  setCanvasImage: Dispatch<SetStateAction<File | undefined>>;
}) => {
  return (
    <div className="flex flex-col">
      <span className="text-xl mb-1">Write a math problem</span>
      <Canvas setCanvasImage={setCanvasImage} />
    </div>
  );
};

export default WriteEquation;
