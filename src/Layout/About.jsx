import Navbar from "./Navbar";
import HeaderComponent from "./HeaderComponent";

const About = () => {
  return (
    <div>
      {/* Hero */}
      <div className="rounded-b-[300px] bg-eggplant-800 pb-48">
        <Navbar />
        <div className="px-4 pt-16 text-center">
          <h2 className="font-serif text-4xl font-bold leading-tight text-white md:text-6xl md:leading-tight">
            About <span className="text-blossom-300">Music.io</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default About;
