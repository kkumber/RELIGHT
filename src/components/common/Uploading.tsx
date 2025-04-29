import { FaUpload } from "react-icons/fa";

const Uploading = () => {
  return (
    <div className="flex items-center justify-center gap-4">
      <FaUpload size={15} className="animate-bounce" />
      <p className="">Uploading</p>
    </div>
  );
};

export default Uploading;
