const Tagline = ({ songs = "456k", artists = "67" }) => {
  return (
    <div className="text-center">
      <h2 className="font-serif text-4xl font-bold leading-tight text-white md:text-6xl md:leading-tight">
        Where every <span className="text-blossom-300">Emotion</span>
        <br />
        finds its <span className="text-blossom-400">Sound</span>
      </h2>

      <p className="mt-10 text-sm tracking-wider text-eggplant-200">
        <span className="font-semibold text-white">{songs}</span> Songs
        <span className="ml-4 font-semibold text-white">{artists}</span> Artists
      </p>
    </div>
  );
};

export default Tagline;
