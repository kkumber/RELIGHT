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
        className="border-[1px] border-gray-300 rounded-t-sm p-2"
        rows={5}
      />
      <div className="p-4 border-[1px] border-gray-300 justify-end flex rounded-b-sm">
        <button className="py-2 px-4 bg-primaryRed text-white rounded-lg">
          Upload Comment
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
