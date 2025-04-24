import { BsShare, BsShareFill } from "react-icons/bs";

interface Prop {
  handleHover: (btn: string | null) => void;
  hovered: string | null;
}

const CopyLinkButton = ({ handleHover, hovered }: Prop) => {
  const copyCurrentLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy the link: ", err);
      });
  };

  return (
    <button
      onClick={() => copyCurrentLink()}
      className="flex flex-col gap-2"
      onMouseEnter={() => handleHover("share")}
      onMouseLeave={() => handleHover(null)}
    >
      <div className="flex justify-center items-center">
        {hovered === "share" ? (
          <BsShareFill size={25} />
        ) : (
          <BsShare size={25} />
        )}
      </div>
      <p>Share</p>
    </button>
  );
};

export default CopyLinkButton;
