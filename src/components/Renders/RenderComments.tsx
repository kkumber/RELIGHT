
interface Prop {
    userComment: UserComment
}

export interface UserComment {
    owner: string,
    content: string,
    post_date: string
}

const RenderComments = ({userComment}: Prop) => {
  return (
    <article>
      <hr />
        <p>{userComment.owner}</p>
        <p>{userComment.post_date}</p>
        <p>{userComment.content}</p>
    </article>
  );
};

export default RenderComments;