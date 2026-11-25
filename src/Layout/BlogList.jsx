import { useNavigate } from "react-router";
import { Link } from "react-router";
const BlogList = ({blog }) => {
    const navigate = useNavigate();
    const handleDelete = (id) => {
         fetch(`http://localhost:9000/blogs/${id}`, {
             method: "DELETE"
         }).then(()=>{
             navigate("/");
             console.log("deleted");
            
         })
    }
    return (
        <div>
            {blog.map((post) => (
                <div key={post.id} className=" m-4 p-4 rounded-md shadow-md bg-eggplant-200 border-blossom-200 py-4">
                    <Link to={`/blog/${post.id}`} className="text-blossom-500 hover:text-blossom-700">
                        {post.title}
                        <h2 className="text-xl font-bold text-blossom-800">{post.title}</h2>
                    <p className="text-blossom-500">{post.content}</p>
                    
                    </Link>
                    <button onClick={() => handleDelete(post.id)} className="bg-blossom-500 hover:bg-blossom-600 text-white font-bold py-2 px-4 rounded">
                        Delete
                    </button>
                    
                </div>
            ))}
        </div>
    );
};

export default BlogList;