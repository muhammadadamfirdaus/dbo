import React from "react";
import imageLogoXauriusGold from "../../assets/images/logo-xaurius-gold.png";
import imageDownloadAppStore from "../../assets/images/download-app-store-light.png";
import imageDownloadPlayStore from "../../assets/images/download-play-store-light.png";
import iconTwitter from "../../assets/icons/social/twitter.svg";
import iconLinkedin from "../../assets/icons/social/linkedin.svg";
import iconFacebook from "../../assets/icons/social/facebook.svg";

function Footer() {
  const time = new Date();
  const currentYear = time.getFullYear();

  return (
    <>
      <div className="bg-black">
        <div className="px-8 md:px-20 py-14">
          <div className="md:flex mb-14">
            <div className="md:basis-3/4">
              <div className="w-[24%] md:w-[12%] mb-4">
                <img src={imageLogoXauriusGold} alt="Xaurius Logo Gold" />
              </div>
              <div className="w-[320px]">
                <p className="text-white">Design amazing digital experiences that create more happy in the world.</p>
              </div>
              <ul className="text-white flex flex-wrap mt-8">
                <li className="mr-2 mb-2">
                  <span>Overview</span>
                </li>
                <li className="mr-2 mb-2">
                  <span>Whitepaper</span>
                </li>
                <li className="mr-2 mb-2">
                  <span>FAQ's</span>
                </li>
                <li className="mr-2 mb-2">
                  <span>Contact</span>
                </li>
                <li className="mr-2 mb-2">
                  <span>About</span>
                </li>
              </ul>
            </div>
            <div className="md:basis-1/4">
              <h4 className="text-white font-semibold text-xl mb-6">Get the App</h4>
              <ul>
                <li className="mb-4 w-[140px]">
                  <img className="h-full" src={imageDownloadAppStore} alt="Download App Store" />
                </li>
                <li className="mb-4 w-[140px]">
                  <img className="h-full" src={imageDownloadPlayStore} alt="Download Play Store" />
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-t-white py-4">
            <div className="md:flex py-4">
              <div className="md:flex md:basis-2/4 mb-12">
                <p className="text-white text-center md:text-left mr-2">&copy; {currentYear} PT Xaurius Aset Digital.</p>
                <p className="text-white text-center md:text-left">All rights reserved.</p>
              </div>
              <div className="md:basis-2/4">
                <ul className="flex justify-center md:justify-end">
                  <li className="ml-4">
                    <img src={iconTwitter} alt="Xaurius Twitter" />
                  </li>
                  <li className="ml-4">
                    <img src={iconLinkedin} alt="Xaurius Linkedin" />
                  </li>
                  <li className="ml-4">
                    <img src={iconFacebook} alt="Xaurius Facebook" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
