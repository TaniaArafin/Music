import Header from "./Header";
import HeaderComponent from "./HeaderComponent";
import BlogList from "./BlogList";
import { useState, useEffect } from "react";
import useFetch from "../CustomHook/UseFetch";
const Content = () => {
  const [blog, setBlog] = useState(null);

  const [name, setName] = useState("Tania");
//   const [isPending, setIsPending] = useState(true);
  const [search, setSearch] = useState("");
//   const [error, setError] = useState(null);
 const { data, isPending, error } = useFetch("http://localhost:9000/blogs");

  const filteredBlogs = data
    ? data.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()))
    : null;

  const handleDelete = (id) => {
    const newBlogs = data.filter((b) => b.id !== id);
    setBlog(newBlogs);
  };

 

  return (
    <div>
      <Header onSearch={setSearch} />
      <section className="relative z-10 mx-auto -mt-40 mb-16 max-w-5xl px-4">
        <div className="grid gap-8 rounded-[40px] bg-gradient-to-b from-eggplant-600/60 via-eggplant-600/25 to-eggplant-100/0 p-6 md:grid-cols-2 md:p-12">
          <HeaderComponent
            icon="check"
            title={"Recommend Everyone"}
            content={
              "Music.io is a website that allows users to recommend music to other users."
            }
          />
          <HeaderComponent
            icon="star"
            title={"Best Play Music"}
            content={
              "Everyone uses Music.io to find songs that calm the mind and accompany the day."
            }
          />
        </div>
      </section>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {filteredBlogs && <BlogList blog={filteredBlogs} handleDelete={handleDelete} />}
      <button onClick={() => setName("Arafin")}>Change Name</button>

      <div>{name} </div>
    </div>
  );
};

export default Content;
