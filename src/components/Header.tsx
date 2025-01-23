import ImageCarousel from "./UI/ImageCarousel";

const Header = () => {
    const images = ['/images/header/formal_picture.jpg', '/images/header/pic2.jpg']
    return ( 
        <header className="w-full">
            <ImageCarousel images={images} />
        </header>
     );
}
 
export default Header
;