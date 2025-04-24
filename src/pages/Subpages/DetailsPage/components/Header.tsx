import { Book } from "../../../../components/Renders/RenderBooks";

interface Prop {
  book_cover: string;
  title: string;
}

const Header = ({ book_cover, title }: Prop) => {
  return (
    <>
      <div className="absolute inset-0 backdrop-blur-xs bg-gradient-to-b from-black/40 to-gray-100 dark:from-black/60 dark:to-[#121212] overflow-hidden"></div>
      <div className="z-0 bg-center bg-no-repeat">
        <img
          src={`https://res.cloudinary.com/dkhgtdh3i/${book_cover}`}
          alt={title}
          className="w-full h-[50vh] md:h-[70vh] object-cover"
        />
      </div>
    </>
  );
};

export default Header;
