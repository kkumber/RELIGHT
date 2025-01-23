import ImageCarousel from "../UI/ImageCarousel";

const Header = () => {
    const images = ['/images/header/wuwa.jpg', '/images/header/pic2.jpg', '/images/header/changli.jpg']
    return ( 
        <header className="w-full mb-12">
            <ImageCarousel images={images} />
        </header>
     );
}
 
export default Header
;