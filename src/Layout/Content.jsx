import Header from "./Header";
import HeaderComponent from "./HeaderComponent";
import BlogList from "./BlogList";
import { useState, useEffect } from "react";
const Content = () => {
  const [blog, setBlog] = useState(null);

  const [name, setName] = useState("Tania");

  const handleDelete = (id) => {
    const newBlogs = blog.filter((b) => b.id !== id);
    setBlog(newBlogs);
  };

  useEffect(() => {
    fetch("http://localhost:9000/blogs")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBlog(data);
      });
  }, []);

  return (
    <div>
      <Header></Header>
      <HeaderComponent
        title={"Recommend Everyone"}
        content={
          "Music.io is a website that allows users to recommend music to other users."
        }
      />
      {blog && <BlogList blog={blog} handleDelete={handleDelete} />}
      <button onClick={() => setName("Arafin")}>Change Name</button>

      <div>{name} </div>
    </div>
  );
};

export default Content;
