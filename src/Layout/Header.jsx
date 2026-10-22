import Tagline from "./Tagline";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";

const Header = ({ onSearch }) => {
  return (
    <div className="rounded-b-[300px] bg-eggplant-800 pb-56">
      <Navbar />

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
