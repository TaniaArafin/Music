import { useState } from "react";
import useFetch from "../CustomHook/UseFetch";
import { useNavigate } from "react-router";

const inputClass =
  "w-full rounded-xl border border-eggplant-200 bg-eggplant-50 px-4 py-3 text-eggplant-900 placeholder-eggplant-400 outline-none transition duration-200 focus:border-blossom-400 focus:bg-white focus:ring-4 focus:ring-blossom-200/60";

const labelClass = "mb-2 block text-sm font-semibold tracking-wide text-eggplant-800";

const Create = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState(""); 
    const [author, setAuthor] = useState("mario");
    const [isPending, setIsPending] = useState(false);
    const navigate= useNavigate();

    const handleSubmit =(e) =>{
        e.preventDefault();
        const blog = {title, content, author};
        setIsPending(true);

        fetch('http://localhost:9000/blogs', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(blog) 
        }).then(()=>{
            console.log('new blog added');
            setIsPending(false);
            navigate("/about");
        })


        console.log(blog);
    }
  return (
    <section className="mx-auto my-16 max-w-3xl px-4">
      <div className="rounded-[40px] bg-gradient-to-b from-eggplant-600/50 via-eggplant-600/20 to-eggplant-100/0 p-4 md:p-10">
        <div className="rounded-3xl bg-white p-8 shadow-xl md:p-12">
          {/* Heading */}
          <div className="mb-10 flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blossom-400 shadow-md">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" />
              </svg>
            </div>
            <h1 className="mt-6 font-serif text-3xl font-bold text-eggplant-950 md:text-4xl">
              Add a New <span className="text-blossom-500">Blog</span>
            </h1>
            <p className="mt-3 tracking-wide text-eggplant-500">
              Share a song, a story or a feeling with everyone.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" className={labelClass}>
                Blog title
              </label>
              <input
                id="title"
                type="text"
                value = {title}
                required
                placeholder="e.g. Songs that calm my mind"
                className={inputClass}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="body" className={labelClass}>
                Blog body
              </label>
              <textarea
                id="body"
                required
                rows={6}
                placeholder="Write your thoughts here..."
                className={`${inputClass} resize-none leading-relaxed`}
                value = {content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="author" className={labelClass}>
                Blog author
              </label>
              <div className="relative">
                <select
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                 id="author" className={`${inputClass} cursor-pointer appearance-none pr-12`}>
                  <option value="mario">mario</option>
                  <option value="yoshi">yoshi</option>
                </select>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blossom-500"
                >
                  <path d="M5.3 7.3a1 1 0 011.4 0L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z" />
                </svg>
              </div>
            </div>

             {!isPending && <button
              type="submit"
              className="w-full rounded-full bg-blossom-500 py-4 font-semibold tracking-wide text-white shadow-lg shadow-blossom-500/30 transition duration-200 hover:-translate-y-0.5 hover:bg-blossom-600 hover:shadow-xl active:translate-y-0"
            >
              Add Blog
            </button>}

            {isPending && <button
              type="submit"
              disabled
              className="w-full rounded-full bg-blossom-500 py-4 font-semibold tracking-wide text-white shadow-lg shadow-blossom-500/30 transition duration-200 hover:-translate-y-0.5 hover:bg-blossom-600 hover:shadow-xl active:translate-y-0"
            >
              Adding Blog..
            </button>}
          
          </form>
        </div>
      </div>
    </section>
  );
};

export default Create;
