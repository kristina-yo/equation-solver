import Image from "next/image";

const ImagePreview = ({ equationImage }: { equationImage: string | null }) => {
  return (
    <div className="flex items-center ">
      <Image
        src={equationImage ?? ""}
        alt="Math Equation"
        width={400}
        height={200}
      />
    </div>
  );
};

export default ImagePreview;
