import { Link } from "react-router-dom";
import Logo from "../../assets/vialerta.svg?react";
import Menu from "../../assets/menu.svg?react";
import { useContext, useState } from "react";
import { userContext } from "../../contexts/AuthContext";
import Button from "./Button";

const Header = () => {
  const { loggedIn, logout } = useContext(userContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border border-gray-100 shadow-sm shadow-gray-100">
      <div className="relative mx-auto flex w-full items-center justify-between px-3 py-6 xl:max-w-7xl">
        <Link to={"/"}>
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
            {loggedIn ? (
              <>
                <li className="cursor-pointer py-2 text-white md:text-gray-950">
                  <Link to={"/"}>Status</Link>
                </li>
                <li
                  className="cursor-pointer py-2 text-white md:text-gray-950"
                  onClick={logout}
                >
                  Sair
                </li>
              </>
            ) : (
              <>
                <li className="cursor-pointer py-2 text-white md:text-gray-950">
                  <Link to={"/login"}>
                    <Button>Entrar</Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
