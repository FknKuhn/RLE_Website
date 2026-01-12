"use client";
import VideoSplash from "@/components/videosplash";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { useRouter } from "next/navigation";

function Home() {
  const { push } = useRouter();

  return (
    <div className="flex flex-col gap-y-5 items-center">
      <VideoSplash />
      <Card className="py-10 px-8 w-full max-w-full border-danger bg-currentcolor bg-gradient-to-t to-white/3 border-t-6">
        <CardHeader className="justify-center flex-col pb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
            Welcome to RLE Enterprises
          </h1>
        </CardHeader>
        <CardBody className="gap-6">
          <div className="space-y-4">
            <p className="text-base text-center leading-relaxed">
              Owned and operated by{" "}
              <span className="text-danger font-semibold">Johnny Gentile</span>,
              RLE Enterprises is a family-owned business established in{" "}
              <span className="text-danger font-semibold">1991</span> by John
              Gentile Sr.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 my-6">
            <Button
              className="font-bold text-sm sm:text-base md:text-lg lg:text-xl border-b-4 border-danger/40"
              size="lg"
              variant="ghost"
              color="danger"
              onPress={() => {
                push("/services?tab=trucking");
              }}
            >
              Trucking Services
            </Button>
            <Button
              className="font-bold text-sm sm:text-base md:text-lg lg:text-xl border-b-4 border-danger/40"
              size="lg"
              variant="ghost"
              color="danger"
              onPress={() => {
                push("/services?tab=excavation");
              }}
            >
              Complex Excavation
            </Button>
            <Button
              className="font-bold text-sm sm:text-base md:text-lg lg:text-xl border-b-4 border-danger/40"
              size="lg"
              variant="ghost"
              color="danger"
              onPress={() => {
                push("/services?tab=crane");
              }}
            >
              Crane Services
            </Button>
            <Button
              className="font-bold text-sm sm:text-base md:text-lg lg:text-xl border-b-4 border-danger/40"
              size="lg"
              variant="ghost"
              color="danger"
              onPress={() => {
                push("/services?tab=oil");
              }}
            >
              Gas & Oil Services
            </Button>
            <Button
              className="font-bold text-sm sm:text-base md:text-lg lg:text-xl border-b-4 border-danger/40"
              size="lg"
              variant="ghost"
              color="danger"
              onPress={() => {
                push("/services?tab=towing");
              }}
            >
              Towing Services
            </Button>
            <Button
              className="font-bold text-sm sm:text-base md:text-lg lg:text-xl border-b-4 border-danger/40"
              size="lg"
              variant="ghost"
              color="danger"
              onPress={() => {
                push("/services?tab=pilotservices");
              }}
            >
              Pilot Car Services
            </Button>
          </div>

          <div className="space-y-4">
            <p className="text-base leading-relaxed">
              Our company offers a wide range of services with a dedication to
              quality. We consistently strive to exceed our customers'
              expectations, helping them achieve their goals and milestones
              while ensuring your project is put together with superior quality,
              cost efficiency, and expert management.
            </p>

            <p className="text-base leading-relaxed">
              Our Project Managers are with your project from estimate to
              closeout. We take pride in our team of highly skilled employees
              who bring experience and expertise to every project. Our employees
              are the backbone of the company, enabling us to maintain a strong
              and reliable operation that delivers results day in and day out.
            </p>

            <p className="text-base leading-relaxed">
              Whether we're handling Complex Excavations Projects, providing
              efficient Hauling Solutions, or supporting Gas and Oil Operations,
              our focus remains on providing exceptional service with safety and
              reliability at the forefront.
            </p>
          </div>

          <div className="border-l-4 border-danger bg-currentcolor bg-gradient-to-t to-white/10 p-6 my-6">
            <p className="text-base text-center font-semibold leading-relaxed">
              At RLE Enterprises, we're committed to getting the job done right,
              the first time. Let us help you meet your project goals with
              proven success.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Home;
