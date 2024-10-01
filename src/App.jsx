import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { useNavigate, Outlet } from 'react-router-dom';
function App() {
  const [posts, addPosts] = useState([])
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchPost = async() =>{
      try{
        const response = await axios.get('https://blog-app-backend-3v2j.onrender.com/')
        console.log(response.data)
        addPosts(response.data)
      } catch(err){
        console.error(err)
      }
    }  
    fetchPost()
  }, [])
  const handlePost = () =>{
    navigate('/add/post')
  }
  const handleDelete = async (id) => {
    try {
      // Replace the :id in the URL with the actual post ID
      const response = await axios.delete(`https://blog-app-backend-3v2j.onrender.com/api/posts/delete/${id}`);
      const updatedPosts = posts.filter((post) => post.id !== id);
       addPosts(updatedPosts);
       console.log(id, 'is clicked');
      console.log(response.data); // Optionally log the server response
    } catch (error) {
      console.error('Error deleting the post:', error);
    }
    
  };
  const handleEdit = async(id) => {
    const response = await axios.patch(`https://blog-app-backend-3v2j.onrender.com/api/posts/update/${id}`)
    console.log(id, 'is clicked');
    navigate(`/update/post/${id}`)
  }
  return (
    <>
      <div className='generalContainer'>
        <div className='allPostContainer'>
          <div className='elementsContainer'>
            <div className='header'>
              <h1>My Blog</h1>
              <button className='post'onClick={handlePost}>Post</button>
            </div>
            <Outlet posts={posts} />
            <div>
              {posts.map((post, index) =>(
                <div key={index} className="postLists">
                  <h2>{post.title}</h2>
                  <p>{post.date}</p>
                  <p>{post.content}</p>
                  <p>{post.author}</p>
                  <div>
                    <button className= 'editButton' onClick={() => handleEdit(post.id)}>Edit</button>
                    <button className= 'deleteButton' onClick={() => handleDelete(post.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
