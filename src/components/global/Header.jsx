import { Link } from "react-router-dom";
import Logo from "../../assets/vialerta.svg?react";
import Menu from "../../assets/menu.svg?react";
import { useState } from "react";

const Header = ({ children, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border border-gray-100 shadow-sm shadow-gray-100">
      <div className="relative mx-auto flex w-full items-center justify-between px-3 py-6 xl:max-w-7xl">
        <Link to={"/home"}>
          <Logo />
        </Link>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <Menu />
        </button>
        <nav
          className={`right-5 top-20 z-50 rounded-md bg-neutral-900 p-5 md:static md:block md:bg-transparent md:p-0
        ${isOpen ? "absolute" : "hidden"}`}
        >
          <ul className="md:flex md:items-center md:gap-8">
            {links &&
              links.map((link) => {
                return (
                  <li
                    key={link.title}
                    className="cursor-pointer py-2 text-white md:text-gray-950"
                  >
                    <Link to={link.url}>{link.title}</Link>
                  </li>
                );
              })}

            {children &&
              children.map((child, index) => {
                return (
                  <li key={index} className="py-2">
                    {child}
                  </li>
                );
              })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
