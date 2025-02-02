interface Prop {
  userComment: UserComment;
}

export interface UserComment {
  owner: string;
  content: string;
  post_date: string;
}

const RenderComments = ({ userComment }: Prop) => {
  return (
    <article className="border-[1px] border-black/10 dark:border-white/10 p-4 rounded-md">
      {/* Profile */}
      <div className="">
        <p>{userComment.owner}</p>
        <p className="text-xs text-black/40 dark:text-white/40">
          {userComment.post_date}
        </p>
      </div>
      <p>{userComment.content}</p>
    </article>
  );
};

export default RenderComments;
