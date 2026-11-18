import Image from "next/image";

export default function VideoSplash() {
  return (
    // Full-bleed hero: breaks out of the page container and starts at the very
    // top so the transparent navbar sits over it
    // (self-start stops a centering flex parent from shifting it a second time)
    <div className="relative self-start shrink-0 w-screen ml-[calc(50%-50vw)] -mt-24 h-[75vh] min-h-[420px] overflow-hidden">
      <Image
        fill
        priority
        alt="RLE Enterprises trucks hauling oversize loads"
        className="object-cover object-[center_58%]"
        sizes="100vw"
        src="/images/RLE_hero.jpg"
      />

      {/* Darken the top so the dark-mode navbar stays readable over the sky */}
      <div className="hidden dark:block absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent z-[1]" />

      {/* Bottom gradient fade into page background */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-[2]" />
    </div>
  );
}
