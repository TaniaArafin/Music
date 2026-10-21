
import Header from './Header';
import HeaderComponent from './HeaderComponent';
import BlogList from './BlogList';
import { useState, useEffect } from 'react';
const Content = () => {
    const [blog, setBlog] = useState([
        { id: 1, title: 'My First Blog', content: 'This is my first blog post.' },
        { id: 2, title: 'My Second Blog', content: 'This is my second blog post.' },
        { id: 3, title: 'My Third Blog', content: 'This is my third blog post.' }
    ]);

    const [name, setName] = useState("Tania");


    const handleDelete = (id)=>{
        const newBlogs = blog.filter((b) => b.id !== id);
        setBlog(newBlogs);
    }



    useEffect(() =>{
        console.log("use effect is running");
        console.log(name);
    }, [name])

    return ( 
            <div>
                <Header>
                </Header>
                <HeaderComponent title={"Recommend Everyone"} content={"Music.io is a website that allows users to recommend music to other users."} />
                <BlogList blog={blog}  handleDelete={handleDelete}/>
                <button onClick={() => setName("Arafin")}>Change Name</button>
            
                <div>{ name} </div>
            </div>
    );
}
 
export default Content;