interface Prop {
  setContent: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleCommentSubmit: (e: React.FormEvent) => void;
}

const CommentForm = ({ setContent, handleCommentSubmit }: Prop) => {
  return (
    <form onSubmit={handleCommentSubmit} className="flex flex-col">
      <textarea
        name="content"
        placeholder="Comment..."
        onChange={(e) => setContent(e.target.value)}
        className="border-[1px] border-black/10 dark:border-white/10 rounded-t-sm p-2 dark:bg-[#1e1e1e]"
        rows={5}
      />
      <div className="p-4 border-[1px] border-black/10 dark:border-white/10 justify-end flex rounded-b-sm">
        <button className="py-2 px-4 bg-primaryRed text-white rounded-lg hover:bg-primaryRed/80">
          Upload Comment
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
