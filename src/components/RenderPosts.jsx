import DeletePost from "./DeletePost";
import PostCard from "./PostCard";
import Box from "@mui/material/Box";

function RenderPosts({ posts, setPosts, error }) {
  return (
   <Box sx={{margin:"60px auto 0 auto", minWidth:"80%"}}>
      <h1>{error && error}</h1>


      <Box
        sx={{
          display: { md: "flex", sm:"flex"  },
          width: "100%",
          background: "linear-gradient(to top, #09203f 0%, #537895 100%)",
          padding: "30px",
          flexDirection:"column",
          alignItems:"center", 
          border:"2px",
          borderColor:"black",
          marginBottom:"4px",

          justifyContent: "center",
        }}
       
      >

            {
             posts && posts.map((post, indx)=>{
                return ( <PostCard key={indx} post={post} /> )
              })
            }











{/* 
        <PostCard posts={posts} setPosts={setPosts} error={error} /> */}
      </Box>

      {/* {posts &&
        posts.map((post, indx) => {
          return (
            <div key={indx} className="p-2 group bg-lime-200 m-3 ">
              <h1 className="p-3 my-2">{post.postbody}</h1>
              <div className=" border-2 border-cyan-950 hidden group-hover:block ">
                <DeletePost
                  myPosts={posts}
                  setMyPosts={setPosts}
                  postId={post._id}
                />
              </div>
            </div>
          );
        })} */}
    </Box>
  );
}

export default RenderPosts;
