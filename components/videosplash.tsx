"use client";
import { useRef } from "react";

export default function VideoSplash() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative w-full h-[40vh] md:h-[45vh] -mt-10">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
      >
        <source src="/videos/RLESplash.mp4" type="video/mp4" />
      </video>

      {/* Optional: Subtle Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/20 z-[1] rounded-xl" />

      {/* Content Overlay
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
      <img
        src="/images/RLELogo.png"
        alt="RLE Enterprises Logo"
        className="w-[22rem] md:w-[30rem] lg:w-[30rem] mb-6 mt-10 opacity-60"
      />
    </div> */}
    </div>
  );
}
