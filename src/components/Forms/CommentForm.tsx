

interface Prop {
    setContent: React.Dispatch<React.SetStateAction<string | undefined>>
    handleCommentSubmit: (e: React.FormEvent) => void
}

const CommentForm = ({setContent, handleCommentSubmit}: Prop) => {

    return (
    <form onSubmit={handleCommentSubmit} className="flex flex-col">
        <textarea name="content" placeholder="Comment..." onChange={(e) => setContent(e.target.value)} className="border-[1px] border-gray-300" />
        <div className="p-4 border-[1px] border-gray-300 justify-end flex">
            <button className="py-2 px-4 bg-primaryRed text-white rounded-lg">Upload Comment</button>
        </div>
    </form>
  );
};

export default CommentForm;