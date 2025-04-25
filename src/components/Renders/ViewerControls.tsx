import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRotateLeft,
  faRotateRight,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
import Bookmark from "../UI/Bookmark";

interface ViewerControlsProps {
  show: boolean;
  toggleNavMode: () => void;
  rotateLeft: () => void;
  rotateRight: () => void;
  pageNum: number;
  currentPage: number;
  navMode: string;
  scrollToPage: (page: number) => void;
  setPageNum: (page: number) => void;
  slug: string | undefined;
}

const ViewerControls: React.FC<ViewerControlsProps> = ({
  show,
  toggleNavMode,
  rotateLeft,
  rotateRight,
  pageNum,
  currentPage,
  navMode,
  scrollToPage,
  setPageNum,
  slug,
}) => (
  <div
    className={`fixed z-10 top-1 left-1 md:top-4 md:left-4 transition-opacity duration-300 ${
      show ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    <div className="flex flex-col gap-4">
      <button
        onClick={toggleNavMode}
        className="w-6 h-6 md:w-12 md:h-12 bg-green-600 text-white rounded-full flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faExchangeAlt} className="text-sm md:text-lg" />
      </button>
      <button
        onClick={rotateLeft}
        className="w-6 h-6 md:w-12 md:h-12 bg-gray-800 text-white rounded-full flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faRotateLeft} className="text-sm md:text-lg" />
      </button>
      <button
        onClick={rotateRight}
        className="w-6 h-6 md:w-12 md:h-12 bg-gray-800 text-white rounded-full flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faRotateRight} className="text-sm md:text-lg" />
      </button>
      <Bookmark
        slug={slug}
        pageNum={pageNum}
        currentPage={currentPage}
        navMode={navMode}
        scrollToPage={scrollToPage}
        setPageNum={setPageNum}
      />
    </div>
  </div>
);

export default ViewerControls;
