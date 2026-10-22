const icons = {
  check: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="white" />
      <path
        d="M8.5 12.5l2.5 2.5 4.5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="white">
      <path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" />
    </svg>
  ),
};

const HeaderComponent = ({ title, content, icon = "check" }) => {
  return (
    <div className="flex flex-col items-center rounded-xl bg-white px-10 py-14 text-center shadow-lg">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blossom-400 text-blossom-400 shadow-md">
        {icons[icon]}
      </div>
      <h3 className="mt-8 font-serif text-2xl font-semibold tracking-wide text-eggplant-950">
        {title}
      </h3>
      <p className="mt-4 max-w-xs leading-relaxed tracking-wide text-eggplant-600">
        {content}
      </p>
    </div>
  );
};

export default HeaderComponent;
