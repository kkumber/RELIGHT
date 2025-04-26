import ImageCarousel from "../UI/ImageCarousel";

const Header = () => {
  const imgSrc = "/images/header/";
  const images = [
    `${imgSrc}1.jpg`,
    `${imgSrc}2.png`,
    `${imgSrc}3.jpg`,
    `${imgSrc}4.jpg`,
    `${imgSrc}5.jpg`,
  ];
  return (
    <header className="w-full mb-12">
      <ImageCarousel images={images} />
    </header>
  );
};

export default Header;
