import Tagline from "./Tagline";
import SearchBar from "./SearchBar";
import { Link } from "react-router";

const Header = ({ onSearch }) => {
  return (
    <div className="rounded-b-[300px] bg-eggplant-800 pb-56">
      <header className="flex flex-row items-start justify-between px-[30px] py-[10px] text-eggplant-500">
        <h1 className="m-0 text-[2em] font-bold text-blossom-50">Music.io</h1>

        <nav className="flex items-center gap-5 pt-[10px]">
          <a href="/" className="text-blossom-50 no-underline hover:text-blossom-300">Home</a>
          <Link to="/about" className="text-blossom-50 no-underline hover:text-blossom-300">About</Link>
          <a href="/contact" className="text-blossom-50 no-underline hover:text-blossom-300">Contact</a>
          <a href="/pricing" className="text-blossom-50 no-underline hover:text-blossom-300">Pricing</a>
        </nav>
      </header>

      <div className="px-4 pt-20">
        <Tagline />
        <div className="mt-6">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </div>
  );
};

export default Header;
