import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faDiscord,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-300 dark:bg-[#1E1E1E] relative bottom-0 w-full p-8 mt-20">
        <div className="flex flex-col md:flex-row items-center justify-center gap-20">
          {/* Contact Info */}
          <div className="flex items-center flex-col gap-2">
            <div className="">
              <b className="text-xl">RELIGHT</b>
            </div>
            <div className="flex gap-x-4 items-center">
              <FontAwesomeIcon icon={faGithub} size="lg" />
              <FontAwesomeIcon icon={faDiscord} size="lg" />
              <FontAwesomeIcon icon={faFacebook} size="lg" />
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </div>
          </div>
          {/* Services */}
          <div className="text-center md:text-start text-gray-600">
            <p>Privacy and Policy</p>
            <p>Terms of Services</p>
            <p>Contact us</p>
          </div>
        </div>
      </footer>
      <div className="text-center text-gray-500 text-sm bg-gray-300 dark:bg-[#1E1E1E] relative bottom-0 w-full p-2 border-t-[1px] border-black/10 dark:border-white/10">
        <p>© Copyright Relight. All Rights Reserved</p>
      </div>
    </>
  );
};

export default Footer;
