import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface Prop {
  title: string;
  message: string;
}

const AlertModal: React.FC<Prop> = ({ title, message }) => {
  const [isOpen, setIsOpen] = useState(true);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-xl p-6 max-w-sm w-full relative">
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
        >
          <AiOutlineClose size={20} />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {title}
        </h2>
        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
};

export default AlertModal;
