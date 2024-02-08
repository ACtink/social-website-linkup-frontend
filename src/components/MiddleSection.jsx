





import React from 'react'
import RenderPosts from './RenderPosts'

function MiddleSection({posts, setPosts, error}) {
  return (
    <div><RenderPosts posts={posts} setPosts={setPosts} error={error} /></div>
  )
}

export default MiddleSection