import { LuBook } from "react-icons/lu";
import { FaBookOpen } from "react-icons/fa";

interface Prop {
  handleReadNavigate: (pdf_file: string) => void;
  pdf_file: string;
  handleHover: (btn: string | null) => void;
  hovered: string | null;
}

const ReadButton = ({
  handleReadNavigate,
  handleHover,
  pdf_file,
  hovered,
}: Prop) => {
  return (
    <button
      onClick={() => handleReadNavigate(pdf_file)}
      className="flex flex-col gap-2 w-min"
      onMouseEnter={() => handleHover("read")}
      onMouseLeave={() => handleHover(null)}
    >
      <div className="flex justify-center items-center">
        {hovered === "read" ? <FaBookOpen size={25} /> : <LuBook size={25} />}
      </div>
      <div>
        <p>Read</p>
      </div>
    </button>
  );
};

export default ReadButton;
