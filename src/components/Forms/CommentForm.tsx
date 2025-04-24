import StarRating from "../UI/StarRating";
import { useState } from "react";

interface Prop {
  setContent: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleCommentSubmit: (e: React.FormEvent) => void;
}

const CommentForm = ({ setContent, handleCommentSubmit }: Prop) => {
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const handleStarRating = (index: number) => {
    setSelectedRating(index);
  };

  return (
    <form onSubmit={handleCommentSubmit} className="flex flex-col">
      <textarea
        name="content"
        placeholder="Review..."
        onChange={(e) => setContent(e.target.value)}
        className="border-[1px] border-black/10 dark:border-white/10 rounded-t-sm p-2 dark:bg-[#1e1e1e]"
        rows={5}
      />
      <div className="p-4 border-[1px] border-black/10 dark:border-white/10 flex rounded-b-sm justify-between">
        <StarRating
          selectedRating={selectedRating}
          handleStarRating={handleStarRating}
        />
        <button className="py-2 px-4 bg-primaryRed text-white rounded-lg hover:bg-primaryRed/80">
          Post Review
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
