"use client";
import VideoSplash from "@/components/videosplash";
import { siteConfig } from "@/config/site";
import { useRouter } from "next/navigation";

const services = [
  { label: "Trucking & Hauling", tab: "trucking", image: siteConfig.Images.TruckingImage },
  { label: "Complex Excavation", tab: "excavation", image: siteConfig.Images.ExcavationImage },
  { label: "Crane Services", tab: "crane", image: siteConfig.Images.CraneImage },
  { label: "Oil & Gas Services", tab: "oil", image: siteConfig.Images.OilAndGasImage },
  { label: "Towing Services", tab: "towing", image: siteConfig.Images.TowingImage },
  { label: "Dumpster & Container", tab: "dumpster", image: siteConfig.Images.DumpsterImage },
  { label: "Pilot Car Services", tab: "pilotservices", image: siteConfig.Images.PilotCarImage },
];

function Home() {
  const { push } = useRouter();

  return (
    <div className="flex flex-col items-center">
      <VideoSplash />

      <div className="w-full border-t-4 border-danger mt-2">
        <div className="py-10 px-4 sm:px-8 max-w-7xl mx-auto">

          {/* Header */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
            Welcome to RLE Enterprises
          </h1>
          <p className="text-base text-center leading-relaxed text-foreground/80 mb-10 max-w-3xl mx-auto">
            Owned and operated by{" "}
            <span className="text-danger font-semibold">Johnny Gentile</span>,
            RLE Enterprises is a family-owned business established in{" "}
            <span className="text-danger font-semibold">1991</span> by John Gentile Sr.
          </p>

          {/* Service image cards */}
          <div className="grid grid-cols-2 gap-4 md:gap-5 mb-14">
            {services.map((service, i) => (
              <button
                key={service.tab}
                onClick={() => push(`/services?tab=${service.tab}`)}
                className={`relative h-40 sm:h-56 lg:h-72 rounded-xl overflow-hidden group cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-danger focus-visible:ring-offset-2${
                  i === services.length - 1 ? " col-span-2" : ""
                }`}
              >
                <img
                  src={service.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute inset-x-0 bottom-0 pt-10 pb-4 px-3 bg-gradient-to-t from-black/65 to-transparent">
                  <p className="text-white font-bold text-sm sm:text-lg text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {service.label}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Body text */}
          <div className="space-y-4 text-center max-w-4xl mx-auto">
            <p className="text-base leading-relaxed text-foreground/90">
              Our company offers a wide range of services with a dedication to
              quality. We consistently strive to exceed our customers&apos;
              expectations, helping them achieve their goals and milestones
              while ensuring your project is put together with superior quality,
              cost efficiency, and expert management.
            </p>

            <p className="text-base leading-relaxed text-foreground/90">
              Our Project Managers are with your project from estimate to
              closeout. We take pride in our team of highly skilled employees
              who bring experience and expertise to every project. Our employees
              are the backbone of the company, enabling us to maintain a strong
              and reliable operation that delivers results day in and day out.
            </p>

            <p className="text-base leading-relaxed text-foreground/90">
              Whether we&apos;re handling Complex Excavations Projects, providing
              efficient Hauling Solutions, or supporting Gas and Oil Operations,
              our focus remains on providing exceptional service with safety and
              reliability at the forefront.
            </p>
          </div>

          {/* Callout */}
          <div className="border-l-4 border-danger bg-[var(--bg-light)] p-6 my-8 rounded-r-lg max-w-4xl mx-auto">
            <p className="text-base text-center font-semibold leading-relaxed">
              At RLE Enterprises, we&apos;re committed to getting the job done right,
              the first time. Let us help you meet your project goals with
              proven success.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;
