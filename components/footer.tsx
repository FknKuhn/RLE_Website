import { siteConfig } from "@/config/site";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { FacebookIcon, InstagramIcon, LinkedInIcon, TikTokIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-currentforeground text-currentcolor ">
      {/* Main Footer Content */}
      <div className="flex justify-center pb-4">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Social Media & Copyright */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex gap-4 mb-6">
                <Link
                  href={siteConfig.links.Instagram}
                  target="_blank"
                  className="text-inherit no-underline"
                >
                  <InstagramIcon size={32} />
                </Link>
                <Link
                  href={siteConfig.links.Facebook}
                  target="_blank"
                  className="text-inherit no-underline"
                >
                  <FacebookIcon size={32} />
                </Link>
                <Link
                  href={siteConfig.links.TikTok}
                  target="_blank"
                  className="text-inherit no-underline"
                >
                  <TikTokIcon size={32} />
                </Link>
                <Link
                  href={siteConfig.links.LinkedIn}
                  target="_blank"
                  className="text-inherit no-underline"
                >
                  <LinkedInIcon size={32} />
                </Link>
              </div>
            </div>

            {/* vertical divider on md+, horizontal divider on mobile */}
            <Divider
              orientation="vertical"
              className="hidden md:block w-px bg-white self-stretch"
            />
            <Divider
              orientation="horizontal"
              className="block md:hidden h-px bg-white w-full my-4"
            />

            {/* Contact Information */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-x-10">
              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold">Physical address</h3>
                <p className="text-sm mb-1">R.L.E. Enterprises Inc.</p>
                <p className="text-sm mb-1">R-457 N. Main St.</p>
                <p className="text-sm mb-4">Moscow, PA 18444</p>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold">Mailing address</h3>
                <p className="text-sm mb-1">R.L.E. Enterprises Inc.</p>
                <p className="text-sm mb-1">P.O. Box #249</p>
                <p className="text-sm mb-4">Moscow, PA 18444</p>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold">Contact us</h3>
                <p className="text-sm">Phone: (570) 842-4051</p>
                <p className="text-sm">Fax: (570) 842-4052</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm text-center mb-4">
              Copyright © RLE Enterprises Inc., All Rights Reserved.
            </p>

            {/* <p className="text-xs text-center">Website Design & Services by</p> */}
            {/* Add your WebWorks logo/link here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
