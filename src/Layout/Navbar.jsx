import { Link, NavLink } from "react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/pricing", label: "Pricing" },
];

const Navbar = () => {
  return (
    <header className="flex flex-row items-start justify-between px-[30px] py-[10px]">
      <Link to="/" className="m-0 text-[2em] font-bold text-blossom-50 no-underline">
        Music.io
      </Link>

      <nav className="flex items-center gap-5 pt-[10px]">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className={({ isActive }) =>
              `no-underline hover:text-blossom-300 ${
                isActive ? "font-semibold text-blossom-300" : "text-blossom-50"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
