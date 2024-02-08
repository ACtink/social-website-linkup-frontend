
import DeletePost from "./DeletePost";

function RenderPosts({posts, setPosts , error}) {
  
  return (
    <div className="overflow-scroll h-72  ">
      <h1>{error && error}</h1>
      {posts &&
        posts.map((post, indx) => {
          return (
            <div key={indx} className="p-2 group bg-lime-200 m-3 ">
              <h1 className="p-3 my-2">
                {post.postbody}
              </h1>
              <div className=" border-2 border-cyan-950 hidden group-hover:block ">
                <DeletePost myPosts={posts} setMyPosts={setPosts}  postId={post._id} />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default RenderPosts;
