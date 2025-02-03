import { Trash2 } from "lucide-react";
import Image from "next/image";

import { Button } from "./button";

type ImageOverlayProps = {
  imageUrl: string;
  setImageUrl: (url: string) => void;
  width?: number;
};

export const ImageOverlay = ({
  imageUrl,
  setImageUrl,
  width,
}: ImageOverlayProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10">
        <Image
          src={imageUrl}
          alt="Food"
          className="max-h-full max-w-full"
          width={width ?? 300}
          height={width ? Math.floor(width * 0.75) : 400}
        />
        <Button
          className="absolute right-4 top-4 text-white"
          onClick={() => setImageUrl("")}
          variant="destructive"
          size="icon"
        >
          <Trash2 className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};
