

interface Prop {
    setContent: React.Dispatch<React.SetStateAction<string | undefined>>
    handleCommentSubmit: (e: React.FormEvent) => void
}

const CommentForm = ({setContent, handleCommentSubmit}: Prop) => {

    return (
    <form onSubmit={handleCommentSubmit}>
        <textarea name="content" placeholder="Comment..." onChange={(e) => setContent(e.target.value)}></textarea> <br />
        <button>Upload Comment</button>
    </form>
  );
};

export default CommentForm;