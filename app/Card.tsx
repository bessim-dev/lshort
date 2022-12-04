"use client";

import Image from "next/image";
import { useState } from "react";

interface CardProps {
  title: string;
  screenshot: string;
  url: string;
  slug: string;
}
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const Card: React.FC<CardProps> = ({ title, screenshot, url, slug }) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <a href={url} className="group">
      <div className="aspect-video overflow-hidden rounded-lg bg-gray-200 relative">
        <Image
          alt={title}
          src={screenshot}
          fill
          className={cn(
            "duration-700 ease-in-out group-hover:opacity-75 object-cover",
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{slug}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{url}</p>
    </a>
  );
};
export default Card;
