const Header = () => {
  return (
   <div className=" min-h-[70vh] rounded-b-[300px] bg-eggplant-800">
     <header className="flex flex-row items-start justify-between px-[30px] py-[10px] text-eggplant-500">
      <h1 className="m-0 text-[2em] font-bold text-blossom-50">Music.io</h1>

      <nav className="flex items-center gap-5 pt-[10px]">
        <a href="/" className="text-blossom-50 no-underline hover:text-blossom-300">Home</a>
        <a href="/about" className="text-blossom-50 no-underline hover:text-blossom-300">About</a>
        <a href="/contact" className="text-blossom-50 no-underline hover:text-blossom-300">Contact</a>
        <a href="/pricing" className="text-blossom-50 no-underline hover:text-blossom-300">Pricing</a>
      </nav>
     
    </header>

    <div className="text-blossom-500 h-34 py-4 bg-blossom-50 flex text-5xl align-center justify-center items-center">Music.io is the music of my individual's emotions</div>
   </div>
    
  );
};

export default Header;
