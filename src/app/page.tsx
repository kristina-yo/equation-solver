"use client";
import EquationConversion from "@/components/EquationConversion";
import HeroAction from "@/components/HeroAction";
import HeroHeading from "@/components/HeroHeading";
import { useState } from "react";

export enum Mode {
  Upload,
  Write,
}

export default function Home() {
  const [mode, setMode] = useState<Mode>(Mode.Write);
  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined
  );

  return (
    <main className="flex min-h-screen  flex-col items-center justify-between p-24">
      <div className="xl:w-[50%]">
        <HeroHeading />
        <HeroAction setMode={setMode} setSelectedImage={setSelectedImage} />
        <hr className="border-solid border-1 my-8  border-gray-300 opacity-100" />
        <EquationConversion
          mode={mode}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      </div>
    </main>
  );
}
