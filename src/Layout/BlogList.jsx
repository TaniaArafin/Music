const BlogList = ({blog, handleDelete }) => {
    return (
        <div>
            {blog.map((post) => (
                <div key={post.id} className=" m-4 p-4 rounded-md shadow-md bg-eggplant-200 border-blossom-200 py-4">
                    <h2 className="text-xl font-bold text-blossom-800">{post.title}</h2>
                    <p className="text-blossom-500">{post.content}</p>
                    <button onClick={() => handleDelete(post.id)} className="bg-blossom-500 hover:bg-blossom-600 text-white font-bold py-2 px-4 rounded">
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default BlogList;