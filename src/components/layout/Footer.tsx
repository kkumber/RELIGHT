import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faDiscord, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-300 p-4 flex items-center justify-evenly flex-wrap-reverse gap-8">
            {/* Contact Info */}
            <div className="flex items-center flex-col gap-2">
                <div className="">
                    <b className="text-xl">RELIGHT</b>
                </div>
                <div className="flex gap-x-4 items-center">
                    <FontAwesomeIcon icon={faGithub} size="lg"/>
                    <FontAwesomeIcon icon={faDiscord} size="lg"/>
                    <FontAwesomeIcon icon={faFacebook} size="lg"/>
                    <FontAwesomeIcon icon={faInstagram} size="lg"/>
                </div>
            </div>
            {/* Services */}
            <div className="text-center md:text-start">
                <p>Privacy and Policy</p>
                <p>Terms of Services</p>
                <p>Contact us</p>
            </div>
    </footer>
  );
};

export default Footer;