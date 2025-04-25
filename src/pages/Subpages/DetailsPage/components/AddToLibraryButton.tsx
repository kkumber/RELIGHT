import { FaHeart, FaRegHeart } from "react-icons/fa6";

interface Prop {
  handleBookmark: () => void;
  handleHover: (btn: string | null) => void;
  likes: number[] | undefined;
  userId: number | undefined;
  hovered: string | null;
}

const AddToLibraryButton = ({
  handleBookmark,
  handleHover,
  likes,
  userId,
  hovered,
}: Prop) => {
  return (
    <button
      onClick={() => handleBookmark()}
      className="flex flex-col gap-2"
      onMouseEnter={() => handleHover("heart")}
      onMouseLeave={() => handleHover(null)}
    >
      {likes && likes.includes(userId!) ? (
        <div className="flex justify-center items-center">
          {hovered === "heart" ? (
            <div className="flex flex-col gap-2 justify-center items-center">
              <FaRegHeart size={25} />
              <p>Remove</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 justify-center items-center">
              <FaHeart size={25} />
              <p>In Library</p>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center">
            {hovered === "heart" ? (
              <FaHeart size={25} />
            ) : (
              <FaRegHeart size={25} />
            )}
          </div>
          <p>Add to Library</p>
        </>
      )}
    </button>
  );
};

export default AddToLibraryButton;
