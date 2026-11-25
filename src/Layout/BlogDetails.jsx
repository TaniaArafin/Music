import { useParams } from "react-router";
import useFetch from "../CustomHook/UseFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, isPending, error } = useFetch(`http://localhost:9000/blogs/${id}`);

  return (
    <div>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <p>{blog.content}</p>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;