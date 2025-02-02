import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faDiscord,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-300 py-8 flex items-center justify-center flex-wrap-reverse gap-20 mt-20 dark:bg-[#1E1E1E]">
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
    </footer>
  );
};

export default Footer;
