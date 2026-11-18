"use client";
import ServiceCard from "@/components/servicecard";
import TabPage from "@/components/tabpage";
import { siteConfig } from "@/config/site";
import { Image } from "@heroui/image";
import { Tab, Tabs } from "@heroui/tabs";
import { Key } from "@react-types/shared";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ServicesPage() {
  const { replace } = useRouter();

  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab");
  const [tab, setTab] = useState(defaultTab ?? "trucking");
  const handleTabClick = (e: Key) => {
    setTab(e.toString())
    replace(`/services?tab=${e.toString()}`);
  };

  return (
    <div className="flex w-full flex-col justify-center">
      <h1 className="sr-only">Our Services</h1>
      <Tabs
        color="danger"
        size="lg"
        aria-label="Services"
        variant="bordered"
        classNames={{
          tabList:
            "gap-2 w-full relative p-2 overflow-x-auto md:flex md:justify-center bg-default-100 rounded-lg",
          cursor: "bg-danger",
          tab: "px-4 py-2 h-10 rounded-md",
          tabContent: "text-foreground/85 group-data-[selected=true]:text-white",
        }}
        selectedKey={tab}
        onSelectionChange={handleTabClick}
      >
        <Tab key="trucking" title="Trucking And Hauling">
          <TabPage>
            <ServiceCard>
              <h2 className="text-center text-2xl md:text-3xl font-bold mb-4">
                Trucking & Hauling Services!
              </h2>
              <ul className="space-y-2 text-base md:text-lg">
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Specialized Hauling</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Lowboy</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Flatbeds</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Landoll</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Dump trailers</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Hotshots</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Step decks</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Stretch flatbeds</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Tankers</span>
                </li>
              </ul>
            </ServiceCard>
            {/* Tab Image */}
            <div className="flex-1 flex justify-center md:justify-end">
              <Image
                src={siteConfig.Images.TruckingImage}
                isBlurred
                alt="Trucking and Hauling Services"
                height={400}
                width={600}
                className="rounded-lg object-cover"
              />
            </div>
          </TabPage>
        </Tab>
        <Tab key="excavation" title="Excavation">
          <TabPage>
            <ServiceCard>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Excavation Services!
              </h2>
              <ul className="space-y-2 text-base md:text-lg">
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">
                    Residential & Commercial
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Site Work</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Utility Work</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">
                    Heavy Highway Excavation
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Land Clearing & Grading</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Foundation</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Storm & Sewer</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Demolition</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Grading</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Vacuum Truck</span>
                </li>
              </ul>
            </ServiceCard>
            {/* Tab Image */}
            <div className="flex-1 flex justify-center md:justify-end">
              <Image
                isBlurred
                height={400}
                width={600}
                src="/images/Excavation.jpg"
                alt="Excavation Services"
                className="rounded-lg object-cover"
              />
            </div>
          </TabPage>
        </Tab>
        <Tab key="crane" title="Crane">
          <TabPage>
            <ServiceCard>
              <h2 className="text-center text-2xl md:text-3xl font-bold mb-4">
                Crane Services!
              </h2>
              <ul className="space-y-2 text-base md:text-lg">
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">
                    Indoor & Outdoor Services
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Cranes 9 Ton to 165 Ton</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">
                    Residential & Commercial
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">
                    Cranes Operated by Licensed Operators
                  </span>
                </li>
              </ul>
            </ServiceCard>
            {/* Tab Image */}
            <div className="flex-1 flex justify-center md:justify-end">
              <Image
                isBlurred
                height={400}
                width={600}
                src={siteConfig.Images.CraneImage}
                alt="Crane Services"
                className="rounded-lg object-cover"
              />
            </div>
          </TabPage>
        </Tab>
        <Tab key="oil" title="Oil and Gas Services">
          <TabPage>
            <ServiceCard>
              <h2 className="text-center text-2xl md:text-3xl font-bold mb-4">
                Oil and Gas Services!
              </h2>
              <br />

              <h3 className="text-2xl md:text-xl font-bold mb-4">
                Our Customers Include:
              </h3>
              <ul className="space-y-2 text-base md:text-lg">
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">American</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Atlas</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Coterra Energy</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Chesapeake</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Exterran</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Seneca Resources</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Superior Energy</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Williams</span>
                </li>
              </ul>
            </ServiceCard>
            {/* Tab Image */}
            <div className="flex-1 flex justify-center md:justify-end">
              <Image
                isBlurred
                height={400}
                width={600}
                src={siteConfig.Images.OilAndGasImage}
                alt="Oil and Gas Services"
                className="rounded-lg object-cover"
              />
            </div>
          </TabPage>
        </Tab>
        <Tab key="towing" title="Towing Services">
          <TabPage>
            <ServiceCard>
              <h2 className="text-center text-2xl md:text-3xl font-bold mb-4">
                Towing Services!
              </h2>
              <br />
              <h3 className="text-center text-2xl md:text-xl font-bold mb-4 ">
                24 Hour Towing 7 Days a Week! <br />
                Call <span className="text-danger">570-842-4051</span>
              </h3>
              <ul className="space-y-2 text-base md:text-lg">
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Light, Medium & Heavy</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">AAA / FleetNet</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Roadside Service</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">
                    Shop / Mechanic Services
                  </span>
                </li>
              </ul>
            </ServiceCard>
            {/* Tab Image */}
            <div className="flex-1 flex justify-center md:justify-end">
              <Image
                isBlurred
                height={400}
                width={600}
                src={siteConfig.Images.TowingImage}
                alt="Towing Services"
                className="rounded-lg object-cover"
              />
            </div>
          </TabPage>
        </Tab>
        <Tab key="dumpster" title="Dumpster and container services">
          <TabPage>
            <ServiceCard>
              <h2 className="text-center text-2xl md:text-3xl font-bold mb-4">
                Dumpster and Container Service
              </h2>
              <br />
              <h3 className="text-center text-2xl md:text-xl font-bold mb-4 ">
                Call <span className="text-danger">570-489-8180</span>
              </h3>
              <ul className="space-y-2 text-base md:text-lg">
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">10 to 40 Yard</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">
                    Residential & Commercial
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">
                    Serving Households, Builders & More
                  </span>
                </li>
              </ul>
            </ServiceCard>
            {/* Tab Image */}
            <div className="flex-1 flex justify-center md:justify-end">
              <Image
                isBlurred
                height={400}
                width={600}
                src={siteConfig.Images.DumpsterImage}
                alt="Dumpster Services"
                className="rounded-lg object-cover"
              />
            </div>
          </TabPage>
        </Tab>
        <Tab key="pilotservices" title="Pilot Car Service">
          <TabPage>
            <ServiceCard>
              <h2 className="text-center text-2xl md:text-3xl font-bold mb-4">
                Pilot Car Services!
              </h2>
              <ul className="space-y-2 text-base md:text-lg">
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">PA Cevos</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Piloting</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Route Surveying</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Variable Message Signs</span>
                </li>
              </ul>
            </ServiceCard>
            <ServiceCard>
              <h2 className="text-center text-2xl md:text-3xl font-bold mb-4">
                Employment Requirements
              </h2>
              <ul className="space-y-2 text-base md:text-lg">
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Valid Drivers License</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Clean Driving Record</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">Be willing to travel</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">
                    Be willing to work weekends
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">
                    Be capable of using a CB Radio
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">
                    Be able to sit and stand for long periods of time
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-danger text-xl">•</span>
                  <span className="font-semibold">
                    Be able to lift more than 20 lbs
                  </span>
                </li>
              </ul>
            </ServiceCard>
          </TabPage>
        </Tab>
      </Tabs>
    </div>
  );
}
