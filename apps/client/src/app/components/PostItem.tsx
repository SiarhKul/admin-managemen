interface IPosts {
  post: {
    userId: number;
    id: number;
    title: string;
    body: string;
  };
}

export const PostItem = ({ post: { userId, id, title, body } }: IPosts) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid black',
      }}
    >
      <p>userId:{userId}</p>
      <p>id:{id}</p>
      <p>title:{title}</p>
      <p>Body :{body}</p>
    </div>
  );
};
